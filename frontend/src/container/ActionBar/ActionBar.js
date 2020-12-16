import React from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import EmojiModal from '../../presenter/EmojiModal'
import Icon from '../../presenter/Icon'
import { COLOR } from '../../constant/style'
import { SMILE, COMMENTDOTS, ELLIPSISV } from '../../constant/icon'
import calcEmojiModalLocation from '../../util/calculateEmojiModalLocation'
import { modalRecoil } from '../../store'
import { useSetRecoilState } from 'recoil'

function ActionBar({ setOpenModal, updateReactionHandler, type, chatId }) {
  const setModal = useSetRecoilState(modalRecoil)
  const { workspaceId, channelId } = useParams()

  const closeHandler = () => {
    setOpenModal(false)
    setModal(null)
  }

  const openEmojiModal = e => {
    const [axisX, axisY] = calcEmojiModalLocation(e)

    setOpenModal(true)
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
    <ActionBarStyle>
      {type !== 'reply' && (
        <>
          <DefaultReactionBtn onClick={() => updateReactionHandler('👍')}>
            👍
          </DefaultReactionBtn>
          <DefaultReactionBtn onClick={() => updateReactionHandler('👏')}>
            👏
          </DefaultReactionBtn>
          <DefaultReactionBtn onClick={() => updateReactionHandler('😄')}>
            😄
          </DefaultReactionBtn>
        </>
      )}
      <DefaultReactionBtn onClick={openEmojiModal}>
        <Icon icon={SMILE} color={COLOR.LABEL_DEFAULT_TEXT} />
      </DefaultReactionBtn>
      {type !== 'reply' && (
        <Link to={`/workspace/${workspaceId}/${channelId}/${chatId}`}>
          <DefaultReactionBtn>
            <Icon icon={COMMENTDOTS} color={COLOR.LABEL_DEFAULT_TEXT} />
          </DefaultReactionBtn>
        </Link>
      )}
      <DefaultReactionBtn>
        <Icon icon={ELLIPSISV} color={COLOR.LABEL_DEFAULT_TEXT} />
      </DefaultReactionBtn>
    </ActionBarStyle>
  )
}

const ActionBarStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${COLOR.BACKGROUNT_MODAL_GRAY};
  box-shadow: 0px 0px 10px -2px grey;
  border-radius: 5px;
  overflow: hidden;
`

const DefaultReactionBtn = styled.div`
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: rgba(100, 100, 100, 0.1);
  }
`

export default ActionBar
