import React from 'react'
import styled from 'styled-components'
import UserProfileImg from '../../atom/UserProfileImg'
import ChatContent from '../../atom/ChatContent'
import { SIZE, COLOR } from '../../constant/style'
const ChatMessage = ({
  userInfo,
  reply,
  createdAt,
  contents,
  type = 'chat',
}) => {
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
      {/* TODO view thread reply 구현  */}
    </StyledMessageContainer>
  )
}
const StyledMessageContainer = styled.div`
  display: flex;
  width: 100%;
  ${({ type }) => {
    if (type === 'reply') return 'padding: 8px 24px 8px 16px;'
    return 'padding: 8px 20px;'
  }}
  &:hover {
    background-color: ${COLOR.HOVER_GRAY};
  }
`

export default ChatMessage
