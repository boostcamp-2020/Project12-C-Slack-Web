import React from 'react'
import ChannelHeader from '../ChannelHeader'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'
const ChatRoom = () => {
  return (
    <ChatArea>
      <ChatHeader>
        <ChannelHeader />
      </ChatHeader>
      <ChatContents>채팅방 내역 / 메시지에디터 위치</ChatContents>
    </ChatArea>
  )
}
const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  background: blue;
`

const ChatHeader = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background: ${COLOR.BACKGROUND_CONTENTS};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ChatContents = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 60px);
  background: ${COLOR.BACKGROUND_CONTENTS};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

export default ChatRoom
