import { ref } from 'vue'
import { getStorage, setStorage } from '../utils/storage'

const STORAGE_KEY = 'stock-calc-style'

function loadStyle() {
  const saved = getStorage(STORAGE_KEY)
  return ['a', 'b', 'c'].includes(saved) ? saved : 'a'
}

const currentStyle = ref(loadStyle())

export function useStyle() {
  function setStyle(s) {
    if (['a', 'b', 'c'].includes(s)) {
      currentStyle.value = s
      setStorage(STORAGE_KEY, s)
    }
  }
  return { style: currentStyle, setStyle }
}
