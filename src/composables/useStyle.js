import { ref } from 'vue'

const currentStyle = ref('a')

export function useStyle() {
  function setStyle(s) {
    if (['a', 'b', 'c'].includes(s)) {
      currentStyle.value = s
    }
  }
  return { style: currentStyle, setStyle }
}
