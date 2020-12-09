import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { useRecoilValue } from 'recoil'
import ChatMessage from '../ChatMessage'
import { COLOR } from '../../constant/style'
import { getChatMessage } from '../../api/chat'
import usePromise from '../../hooks/usePromise'
import MessageEditor from '../messageEditor/MessageEditor'
import { workspaceRecoil } from '../../store'
import ChannelHeader from '../ChannelHeader'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_CHAT_HOST
    : process.env.REACT_APP_CHAT_HOST

const ChatRoom = () => {
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)
  const { workspaceId, channelId } = useParams()
  const [currentCursor, setCurrentCursor] = useState(new Date())
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [, resolved] = usePromise(
    () => getChatMessage({ workspaceId, channelId, currentCursor }),
    [currentCursor, channelId, workspaceId],
  )

  const sendMessage = message => {
    const chat = {
      contents: message,
      userInfo: {
        _id: workspaceUserInfo._id,
        displayName: workspaceUserInfo.displayName,
        profileUrl: workspaceUserInfo.profileUrl,
      },
    }
    setMessages(messages => [...messages, chat])
    socket.emit('new message', chat)
  }

  useEffect(() => {
    if (workspaceUserInfo === null) return false
    setSocket(
      io(baseURL, { query: { channelId, creator: workspaceUserInfo._id } }),
    )
  }, [workspaceId, channelId, workspaceUserInfo])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('connected')
      })
      socket.on('disconnect', () => {
        console.log('disconnected')
      })
      socket.emit('join-room', channelId)
      socket.on('new message', ({ message }) => {
        setMessages(messages => [...messages, message])
      })
    }
    return () => {
      if (socket) {
        socket.off('connect')
        socket.off('disconnect')
        socket.off('new message')
      }
    }
  }, [socket])

  useEffect(() => {
    if (workspaceUserInfo === null) return false
    if (resolved) setMessages(resolved)
  }, [resolved])

  return (
    <ChatArea>
      <ChatHeader>
        <ChannelHeader />
      </ChatHeader>
      <ChatContents>
        {messages.map((message, i) => (
          <ChatMessage key={i} {...message} />
        ))}
      </ChatContents>
      <MessageEditor channelTitle={'hello world'} sendMessage={sendMessage} />
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
  flex-direction: column;
  width: 100%;
  height: calc(100% - 100px);
  overflow-x: hidden;
  overflow-y: auto;
  background: ${COLOR.WHITE};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

export default ChatRoom
