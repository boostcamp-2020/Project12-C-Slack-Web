import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import ChatMessage from '../ChatMessage'
import { COLOR } from '../../constant/style'
import { getChatMessage } from '../../api/chat'
import MessageEditor from '../MessageEditor/MessageEditor'
import {
  workspaceRecoil,
  socketRecoil,
  currentChannelInfoRecoil,
} from '../../store'
import ChannelHeader from '../ChannelHeader'
import { isEmpty } from '../../util'
import { hasMyReaction, chageReactionState } from '../../util/reactionUpdate'
import Icon from '../../presenter/Icon'
import { ArrowDown } from '../../constant/icon'
import { getChannelHeaderInfo } from '../../api/channel'
import { SOCKET_EVENT } from '../../constant'

const ChatRoom = ({ width }) => {
  const viewport = useRef(null)
  const observerTargetNode = useRef(null)
  const messageEndRef = useRef(null)
  const previousReadMessage = useRef(null)
  const isLoading = useRef(false)
  const isAllMessageFetched = useRef(false)
  const isReading = useRef(false)
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)
  const [channelInfo, setChannelInfo] = useRecoilState(currentChannelInfoRecoil)
  const { workspaceId, channelId } = useParams()
  const params = useParams()
  const socket = useRecoilValue(socketRecoil)
  const [messages, setMessages] = useState([])
  const [previousReadMessageIndex, setPreviousReadMessageIndex] = useState(0)
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false)

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

  const updateChannelInfo = useCallback(async () => {
    if (workspaceUserInfo && channelId)
      setChannelInfo(
        await getChannelHeaderInfo({
          workspaceUserInfoId: workspaceUserInfo._id,
          channelId,
        }),
      )
  }, [channelId, workspaceUserInfo, setChannelInfo])

  useEffect(() => {
    updateChannelInfo()
  }, [channelId, workspaceUserInfo, updateChannelInfo])

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
    socket.emit(SOCKET_EVENT.NEW_MESSAGE, chat)
  }

  useEffect(() => {
    setMessages(messages => [...hasMyReaction(messages, workspaceUserInfo)])
  }, [workspaceUserInfo])

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENT.NEW_MESSAGE, ({ message }) => {
        if (message.channelId === channelId) {
          setMessages(messages => [
            ...messages,
            ...hasMyReaction([message], workspaceUserInfo),
          ])
          if (message.userInfo._id === workspaceUserInfo._id) {
            setHasUnreadMessage(false)
            scrollTo()
          } else if (!isReading.current && !document.hasFocus()) {
            setHasUnreadMessage(true)
          }
        }

        if (document.hidden) {
          new Notification('새로운 메시지가 왔습니다.', {
            body: `${message.userInfo.displayName} : ${message.contents}`,
          })
        }

        if (message.userInfo._id === workspaceUserInfo._id) scrollTo()
      })
      socket.on(SOCKET_EVENT.NEW_REPLY, ({ message }) => {
        setMessages(messages =>
          messages.map(target =>
            target._id === message.parentId
              ? { ...target, reply: [...target.reply, message] }
              : target,
          ),
        )
      })
      socket.on(SOCKET_EVENT.UPDAETE_REACTION, ({ reaction }) => {
        setMessages(messages =>
          chageReactionState(messages, reaction, workspaceUserInfo),
        )
      })
    }
    return () => {
      if (socket) {
        socket.off(SOCKET_EVENT.NEW_REPLY)
        socket.off(SOCKET_EVENT.NEW_MESSAGE)
        socket.off(SOCKET_EVENT.UPDAETE_REACTION)
      }
    }
  }, [socket, channelId, document.hidden, params])

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.target === messageEndRef.current) {
          if (!entry.isIntersecting || !document.hasFocus()) {
            isReading.current = false
          }
          if (entry.isIntersecting) {
            setHasUnreadMessage(false)
            isReading.current = true
          }
        }
        if (entry.target === observerTargetNode.current) {
          if (
            entry.isIntersecting &&
            !isLoading.current &&
            !isAllMessageFetched.current
          ) {
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
    if (messageEndRef.current) IO.observe(messageEndRef.current)
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
  const handleUnreadMessageButton = () => {
    scrollTo()
  }
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
        {hasUnreadMessage && (
          <UnreadMessage onClick={handleUnreadMessageButton}>
            <Icon icon={ArrowDown} color={COLOR.WHITE} /> Unread messages..
          </UnreadMessage>
        )}
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
  width: ${props => `calc( 100% - ${props.width}px)`};
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
const UnreadMessage = styled.div`
  border-radius: 30px;
  border: 1px solid ${COLOR.LIGHT_GRAY};
  background-color: ${COLOR.STARBLUE};
  color: ${COLOR.WHITE};
  width: 170px;
  margin-left: auto;
  margin-right: auto;
  position: sticky;
  bottom: 15px;
  text-align: center;
  padding: 5px;
  font-weight: 700;
  cursor: pointer;
`
export default ChatRoom
