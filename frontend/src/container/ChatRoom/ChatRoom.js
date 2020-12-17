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
import { isEmpty } from '../../util'
import { hasMyReaction, chageReactionState } from '../../util/reactionUpdate'
import useChannelInfo from '../../hooks/useChannelInfo'

const ChatRoom = ({ width }) => {
  const viewport = useRef(null)
  const observerTargetNode = useRef(null)
  const messageEndRef = useRef(null)
  const previousReadMessage = useRef(null)
  const isLoading = useRef(false)
  const isAllMessageFetched = useRef(false)
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)
  const [channelInfo] = useChannelInfo()
  const { workspaceId, channelId } = useParams()
  const params = useParams()
  const socket = useRecoilValue(socketRecoil)
  const [messages, setMessages] = useState([])
  const [previousReadMessageIndex, setPreviousReadMessageIndex] = useState(0)

  const loadMessage = useCallback(
    async (workspaceId, channelId, currentCursor) => {
      isLoading.current = true
      const newMessages = await getChatMessage({
        workspaceId,
        channelId,
        currentCursor,
      })
      if (!newMessages.length) isAllMessageFetched.current = true
      if (!isEmpty(messages)) setPreviousReadMessageIndex(newMessages.length)
      setMessages(messages => [
        ...hasMyReaction(newMessages, workspaceUserInfo),
        ...messages,
      ])
      if (previousReadMessage.current) scrollTo(previousReadMessage.current)
      if (!previousReadMessage.current && newMessages.length !== 0) scrollTo()
      isLoading.current = false
    },
    [messages],
  )

  useEffect(() => {
    setMessages([])
    isLoading.current = false
    isAllMessageFetched.current = false
    loadMessage(workspaceId, channelId, new Date())
  }, [workspaceId, channelId])

  const scrollTo = (target = messageEndRef.current) => {
    target.scrollIntoView()
  }

  const sendMessage = (message, file) => {
    const chat = {
      contents: message,
      channelId,
      file: file,
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

        if (document.hidden) {
          new Notification('새로운 메시지가 왔습니다.', {
            body: `${message.userInfo.displayName} : ${message.contents}`,
          })
        }

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
  }, [socket, channelId, document.hidden, params])

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isLoading.current && !isAllMessageFetched.current) {
            loadMessage(workspaceId, channelId, observerTargetNode.current.id)
            observer.unobserve(entry.target)
            observer.observe(observerTargetNode.current)
          }
        }
      })
    }
    const IO = new IntersectionObserver(handleIntersection, {
      root: viewport.current,
      threshold: 0,
    })
    if (observerTargetNode.current) IO.observe(observerTargetNode.current)
    return () => IO && IO.disconnect()
  }, [channelId, workspaceId, loadMessage])

  const setRef = useCallback(
    index => {
      if (index === 0) return node => (observerTargetNode.current = node)
      if (index === previousReadMessageIndex)
        return node => (previousReadMessage.current = node)
    },
    [previousReadMessageIndex],
  )

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
                ref={setRef(i)}
                id={message.createdAt}
              />
            )
          })}
        <div ref={messageEndRef}></div>
      </ChatContents>
      <MessageEditor
        sendMessage={sendMessage}
        placeholder={`Send a message to #${
          channelInfo?.channelId?.title ? channelInfo?.channelId?.title : '...'
        }`}
      />
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
  box-sizing: border-box;
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
