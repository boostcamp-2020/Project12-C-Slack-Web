import { SIZE } from '../constant/style'

const calculateEmojiModalLocation = e => {
  const widthSize = e.view.innerWidth - (e.clientX + SIZE.EMOJI_MODAL_WIDTH)
  const heightSize = e.view.innerHeight - (e.clientY + SIZE.EMOJI_MODAL_HEIGHT)
  let axisX = e.clientX
  let axisY = e.clientY
  if (widthSize < 0) axisX += widthSize
  if (heightSize < 0) axisY += heightSize

  return [axisX, axisY]
}

export default calculateEmojiModalLocation
