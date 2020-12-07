const debounce = (callback, wait) => {
  let timeoutId = null
  return event => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(event), wait)
  }
}

function throttle(func, delay) {
  let lastFunc
  let lastRan
  return function (...args) {
    if (!lastRan) {
      func()
      lastRan = Date.now()
    } else {
      if (lastFunc) clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= delay) {
          func()
          lastRan = Date.now()
        }
      }, delay - (Date.now() - lastRan))
    }
  }
}

export { debounce, throttle }
