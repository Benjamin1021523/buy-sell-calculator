const MAX_TRADE_AMOUNT = 10000
const FEE_RATE = 0.001425
const TAX_RATE = 0.003

/**
 * 成交金額 = 股價 × 股數，小數點捨去
 * 加上微小值避免浮點數誤差（如 9.7*50=484.999...）
 */
export function getTradeAmount(price, shares) {
  return Math.floor(price * shares + 1e-10)
}

/**
 * 手續費 = 成交金額的 0.1425%，小數點捨去，最少為 1
 */
export function getFee(tradeAmount) {
  const fee = Math.floor(tradeAmount * FEE_RATE)
  return Math.max(1, fee)
}

/**
 * 交易稅 = 成交金額的 0.3%，小數點捨去，最少為 0
 */
export function getTax(tradeAmount) {
  return Math.floor(tradeAmount * TAX_RATE)
}

/**
 * 計算買進花費與平均成本
 * @param {number} price - 買進目標價格
 * @returns {{ cost: number, shares: number, avgCost: number } | null}
 */
export function calcBuy(price) {
  if (!price || price <= 0) return null

  const maxShares = Math.floor(MAX_TRADE_AMOUNT / price)
  if (maxShares < 1) {
    const tradeAmount = getTradeAmount(price, 1)
    const fee = getFee(tradeAmount)
    return { cost: tradeAmount + fee, shares: 1, fee, avgCost: (tradeAmount + fee) / 1 }
  }

  let bestShares = 1
  let bestAvgCost = Infinity

  for (let shares = 1; shares <= maxShares; shares++) {
    const tradeAmount = getTradeAmount(price, shares)
    const fee = getFee(tradeAmount)
    const cost = tradeAmount + fee
    const avgCost = cost / shares

    if (avgCost < bestAvgCost) {
      bestAvgCost = avgCost
      bestShares = shares
    }
  }

  const tradeAmount = getTradeAmount(price, bestShares)
  const fee = getFee(tradeAmount)
  const cost = tradeAmount + fee

  return {
    cost,
    shares: bestShares,
    fee,
    avgCost: cost / bestShares,
  }
}

/**
 * 計算賣出收益與平均收益
 * @param {number} price - 賣出目標價格
 * @param {boolean} noTax - 是否免交易稅
 * @returns {{ proceeds: number, shares: number, fee: number, tax: number, avgProceeds: number } | null}
 */
export function calcSell(price, noTax = false) {
  if (!price || price <= 0) return null

  const maxShares = Math.floor(MAX_TRADE_AMOUNT / price)
  if (maxShares < 1) {
    const tradeAmount = getTradeAmount(price, 1)
    const fee = getFee(tradeAmount)
    const tax = noTax ? 0 : getTax(tradeAmount)
    const proceeds = tradeAmount - fee - tax
    return { proceeds, shares: 1, fee, tax, avgProceeds: proceeds / 1 }
  }

  let bestShares = 1
  let bestAvgProceeds = -Infinity

  for (let shares = 1; shares <= maxShares; shares++) {
    const tradeAmount = getTradeAmount(price, shares)
    const fee = getFee(tradeAmount)
    const tax = noTax ? 0 : getTax(tradeAmount)
    const proceeds = tradeAmount - fee - tax
    const avgProceeds = proceeds / shares

    if (avgProceeds > bestAvgProceeds) {
      bestAvgProceeds = avgProceeds
      bestShares = shares
    }
  }

  const tradeAmount = getTradeAmount(price, bestShares)
  const fee = getFee(tradeAmount)
  const tax = noTax ? 0 : getTax(tradeAmount)
  const proceeds = tradeAmount - fee - tax

  return {
    proceeds,
    shares: bestShares,
    fee,
    tax,
    avgProceeds: proceeds / bestShares,
  }
}
