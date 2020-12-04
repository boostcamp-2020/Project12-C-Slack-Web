import React from 'react'
import ChannelHeader from '../ChannelHeader'
import styled from 'styled-components'
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
  height: 10%;
  background: gray;
`
const ChatContents = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
`
export default ChatRoom
