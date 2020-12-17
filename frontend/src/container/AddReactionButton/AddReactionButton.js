import React from 'react'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { modalRecoil } from '../../store'
import EmojiModal from '../../presenter/EmojiModal'

import Icon from '../../presenter/Icon'
import { PLUS, SMILE } from '../../constant/icon'
import { COLOR } from '../../constant/style'
import calcEmojiModalLocation from '../../util/calculateEmojiModalLocation'

function AddReactionButton({ updateReactionHandler }) {
  const setModal = useSetRecoilState(modalRecoil)

  const closeHandler = () => {
    setModal(null)
  }

  const openEmojiModal = e => {
    const [axisX, axisY] = calcEmojiModalLocation(e)

    setModal(
      <EmojiModal
        sendHandler={updateReactionHandler}
        closeHandler={closeHandler}
        axisX={axisX}
        axisY={axisY}
      />,
    )
  }

  return (
    <AddReactionButtonStyle onClick={openEmojiModal}>
      <Icon icon={PLUS} size="8px" />
      <Icon icon={SMILE} size="15px" />
    </AddReactionButtonStyle>
  )
}

const AddReactionButtonStyle = styled.div`
  min-width: 25px;
  height: 20px;
  padding: 0 7px;
  margin: 0 10px 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 1px solid gray;
  color: black;
  background: ${COLOR.HOVER_GRAY};
`

export default AddReactionButton
