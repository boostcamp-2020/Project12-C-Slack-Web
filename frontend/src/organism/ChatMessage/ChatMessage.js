import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import UserProfileImg from '../../atom/UserProfileImg'
import ChatContent from '../../atom/ChatContent'
import ReactionBar from '../ReactionBar'
import { SIZE, COLOR } from '../../constant/style'
const ChatMessage = ({
  userInfo,
  reply,
  _id,
  createdAt,
  contents,
  type = 'chat',
}) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <StyledMessageContainer type={type}>
      <UserProfileImg
        user={{ profileUrl: userInfo.profileUrl }}
        size={SIZE.CHAT_PROFILE}
        type="chat"
      />
      <ChatContent
        displayName={userInfo.displayName}
        createdAt={createdAt}
        contents={contents}
      />
      {/* TODO reaction bar 구현 */}
      <ReactionBarStyle openModal={openModal}>
        <ReactionBar setOpenModal={setOpenModal} chatId={_id} />
      </ReactionBarStyle>
      {/* TODO view thread reply 구현  */}
    </StyledMessageContainer>
  )
}

const ReactionBarStyle = styled.div`
  position: absolute;
  width: 300px;
  height: 30px;
  top: -15px;
  right: 10px;
  border-radius: 5px;
  display: none;
  &:hover {
    display: flex;
  }
  display: ${({ openModal }) => {
    return openModal ? 'flex' : 'none'
  }};
`

const StyledMessageContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: -webkit-fill-available;
  ${({ type }) => {
    if (type === 'reply') return 'padding: 8px 24px 8px 16px;'
    return 'padding: 8px 20px;'
  }}
  &:hover {
    background-color: ${COLOR.HOVER_GRAY};
    ${ReactionBarStyle} {
      display: flex;
    }
  }
`

export default ChatMessage
