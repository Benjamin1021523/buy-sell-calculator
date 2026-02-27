import { ref, computed, watch } from 'vue'
import { getStorage, setStorage } from '../utils/storage'

const STORAGE_KEY = 'stock-calc-fee-discount'

function loadDiscount() {
  const saved = getStorage(STORAGE_KEY)
  return saved != null && saved !== '' ? saved : '10'
}

const discountInput = ref(loadDiscount())

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

  watch(input, (v) => {
    setStorage(STORAGE_KEY, String(v || '10'))
  }, { immediate: true })

  const effectiveRate = computed(() => {
    const r = parseDiscount(input.value)
    return r != null ? r : 1
  })

  return {
    discountInput: input,
    effectiveRate,
  }
}
