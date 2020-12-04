import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'
const ChatContent = ({
  displayName,
  createdAt,
  contents,
  handleProfileModal,
}) => {
  return (
    <StyledChatContent>
      <StyledUserName onClick={handleProfileModal}>
        {displayName}
      </StyledUserName>
      <StyledDate>{createdAt}</StyledDate>
      <div>{contents}</div>
    </StyledChatContent>
  )
}
const StyledChatContent = styled.div`
  margin-left: 10px;
`
const StyledDate = styled.span`
  color: ${COLOR.GRAY};
  font-size: 12px;
`
const StyledUserName = styled.div`
  display: inline-block;
  font-size: 15px;
  line-height: 1.46668;
  font-weight: 900;
  word-break: break-word;
  margin-right: 5px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
export default ChatContent
