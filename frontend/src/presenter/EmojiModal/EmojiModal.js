import React from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import styled from 'styled-components'
import { SIZE } from '../../constant/style'

function EmojiModal({ sendHandler, closeHandler, axisX, axisY }) {
  const addEmoji = emoji => {
    if (emoji !== null) sendHandler(emoji.native)
    closeHandler()
  }
  const stopPropagation = e => {
    e.stopPropagation()
  }

  return (
    <EmojiModalStyle onClick={closeHandler}>
      <EmojiContents onClick={stopPropagation} axisX={axisX} axisY={axisY}>
        <Picker
          set="apple"
          title="Pick your Reaction"
          onSelect={addEmoji}
          theme="dark"
          showPreview={false}
          style={{
            width: `${SIZE.EMOJI_MODAL_WIDTH}px`,
            height: `${SIZE.EMOJI_MODAL_HEIGHT}px`,
          }}
        />
      </EmojiContents>
    </EmojiModalStyle>
  )
}

const EmojiModalStyle = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  overflow: auto;
  z-index: 20;
`

const EmojiContents = styled.div`
  width: auto;
  background-color: black;
  position: absolute;
  top: ${({ axisY }) => axisY + 'px'};
  left: ${({ axisX }) => axisX + 'px'};
`

export default EmojiModal
