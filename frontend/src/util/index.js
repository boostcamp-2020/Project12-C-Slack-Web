const debounce = (callback, wait) => {
  let timeoutId = null
  return event => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(event), wait)
  }
}

export { debounce }
