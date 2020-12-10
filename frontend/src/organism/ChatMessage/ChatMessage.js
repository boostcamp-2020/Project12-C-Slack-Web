import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import UserProfileImg from '../../atom/UserProfileImg'
import ChatContent from '../../atom/ChatContent'
import ActionBar from '../ActionBar'
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
      <MessageContents>
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
      </MessageContents>
      {/* TODO thread Reaction 구현  */}
      {reply && reply.length !== 0 && (
        <ThreadReactionStyle>thread Reaction</ThreadReactionStyle>
      )}

      {/* TODO view thread reply 구현  */}
      {reply && reply.length !== 0 && (
        <ViewThreadBarStyle>view thread</ViewThreadBarStyle>
      )}

      {/* TODO Action bar 구현 */}
      <ActionBarStyle openModal={openModal}>
        <ActionBar setOpenModal={setOpenModal} chatId={_id} />
      </ActionBarStyle>
    </StyledMessageContainer>
  )
}

const ActionBarStyle = styled.div`
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
const MessageContents = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 5px 0;
`

const StyledMessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: -webkit-fill-available;
  ${({ type }) => {
    if (type === 'reply') return 'padding: 8px 24px 8px 16px;'
    return 'padding: 8px 20px;'
  }}
  &:hover {
    background-color: ${COLOR.HOVER_GRAY};
    ${ActionBarStyle} {
      display: flex;
    }
  }
`

const ViewThreadBarStyle = styled.div`
  width: auto;
  height: 30px;
  display: flex;
  flex-direction: row;
`

const ThreadReactionStyle = styled.div`
  width: auto;
  min-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  background: red;
`
export default ChatMessage
