import { ref } from 'vue'

const price = ref('')

export function usePrice() {
  return { price }
}
