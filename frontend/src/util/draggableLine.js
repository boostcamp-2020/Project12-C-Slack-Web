export const draggableLine = (setWidth, reverse, min, max) => {
  return e => {
    if (e.pageX === 0) return false
    let mouse = e.pageX
    let viewWidth = e.view.innerWidth

    if (reverse ? viewWidth - mouse < min : mouse < min) {
      setWidth(min)
    } else if (reverse ? viewWidth - mouse > max : mouse > max) {
      setWidth(max)
    } else {
      setWidth(reverse ? viewWidth - mouse : mouse)
    }
  }
}
