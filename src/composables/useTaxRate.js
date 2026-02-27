import { ref } from 'vue'

const taxRate = ref('0.003')

export function useTaxRate() {
  return { taxRate }
}
