import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import ChatMessage from '../ChatMessage'
import { COLOR } from '../../constant/style'
import { getChatMessage } from '../../api/chat'
import MessageEditor from '../MessageEditor/MessageEditor'
import { workspaceRecoil, socketRecoil } from '../../store'
import ChannelHeader from '../ChannelHeader'
import { hasMyReaction, chageReactionState } from '../../util/reactionUpdate'

const ChatRoom = ({ width }) => {
  const viewport = useRef(null)
  const target = useRef(null)
  const messageEndRef = useRef(null)
  const [targetState, setTargetState] = useState()
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)
  const { workspaceId, channelId } = useParams()
  const params = useParams()
  const socket = useRecoilValue(socketRecoil)
  const [messages, setMessages] = useState([])
  const load = useRef(false)

  const loadMessage = async (workspaceId, channelId, currentCursor) => {
    load.current = true
    const newMessages = await getChatMessage({
      workspaceId,
      channelId,
      currentCursor,
    })
    setMessages(messages => [
      ...hasMyReaction(newMessages, workspaceUserInfo),
      ...messages,
    ])
    load.current = false
  }

  useEffect(() => {
    setMessages([])
    loadMessage(workspaceId, channelId, new Date())
    scrollTo()
  }, [workspaceId, channelId])

  const scrollTo = (targetRef = messageEndRef.current) => {
    targetRef.scrollIntoView()
  }

  const sendMessage = message => {
    const chat = {
      contents: message,
      channelId,
      userInfo: {
        _id: workspaceUserInfo._id,
        displayName: workspaceUserInfo.displayName,
        profileUrl: workspaceUserInfo.profileUrl,
      },
    }
    socket.emit('new message', chat)
  }

  useEffect(() => {
    setMessages(messages => [...hasMyReaction(messages, workspaceUserInfo)])
  }, [workspaceUserInfo])

  useEffect(() => {
    if (socket) {
      socket.on('new message', ({ message }) => {
        if (message.channelId === channelId)
          setMessages(messages => [
            ...messages,
            ...hasMyReaction([message], workspaceUserInfo),
          ])
        if (message.userInfo._id === workspaceUserInfo._id) scrollTo()
      })
      socket.on('update reaction', ({ reaction }) => {
        setMessages(messages => chageReactionState(messages, reaction))
      })
    }
    return () => {
      if (socket) {
        socket.off('new message')
        socket.off('update reaction')
      }
    }
  }, [socket, channelId, params])

  useEffect(() => {
    const option = {
      root: viewport.current,
      threshold: 0,
    }
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!load.current) {
            loadMessage(workspaceId, channelId, target.current.id)
            observer.unobserve(entry.target)
            observer.observe(target.current)
          }
        }
      })
    }
    const IO = new IntersectionObserver(handleIntersection, option)
    if (target.current) IO.observe(target.current)
    return () => IO && IO.disconnect()
  }, [viewport, targetState])

  const setTarget = useCallback(node => {
    target.current = node
    setTargetState(node)
  }, [])

  return (
    <ChatArea width={width}>
      <ChatHeader>
        <ChannelHeader />
      </ChatHeader>
      <ChatContents ref={viewport}>
        {messages &&
          messages.map((message, i) => {
            return (
              <ChatMessage
                key={i}
                {...message}
                ref={i ? null : setTarget}
                id={message.createdAt}
              />
            )
          })}
        <div ref={messageEndRef}></div>
      </ChatContents>
      <MessageEditor channelTitle={'hello world'} sendMessage={sendMessage} />
    </ChatArea>
  )
}
const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(${props => props.width}% - 2px);
  background: ${COLOR.HOVER_GRAY};
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
  height: calc(100% - 100px);
  overflow-x: hidden;
  overflow-y: auto;
  background: ${COLOR.WHITE};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

export default ChatRoom
