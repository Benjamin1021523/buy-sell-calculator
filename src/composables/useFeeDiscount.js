import { ref, computed } from 'vue'

const discountInput = ref('10')

/**
 * 解析 XX折 為乘數
 * 6折 = 0.6, 28折 = 0.28, 10折/100折 = 1.0（無折扣）
 * 1 位數除 10，2 位數除 100；10、100 視為無折扣
 */
export function parseDiscount(str) {
  const s = String(str || '').trim().replace(/折$/, '')
  const match = s.match(/^(\d+)$/)
  if (!match) return null
  const num = parseInt(match[1], 10)
  if (num <= 0) return null
  if (num === 10 || num === 100) return 1
  const digits = String(num).length
  const divisor = Math.pow(10, digits)
  const rate = num / divisor
  if (rate > 1) return 1
  if (rate <= 0) return null
  return rate
}

export function useFeeDiscount() {
  const input = discountInput

  const effectiveRate = computed(() => {
    const r = parseDiscount(input.value)
    return r != null ? r : 1
  })

  return {
    discountInput: input,
    effectiveRate,
  }
}
