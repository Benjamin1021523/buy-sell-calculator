export function getStorage(name) {
  try {
    return localStorage.getItem(name)
  } catch {
    return null
  }
}

export function setStorage(name, value) {
  try {
    localStorage.setItem(name, value)
  } catch {
    // 忽略儲存失敗（如私密模式、空間不足）
  }
}
