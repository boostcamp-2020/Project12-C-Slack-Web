import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import ChatMessage from '../ChatMessage'
import { COLOR } from '../../constant/style'
import { getChatReplyMessage } from '../../api/chat'
import MessageEditor from '../MessageEditor'
import Icon from '../../presenter/Icon'
import { CLOSE } from '../../constant/icon'
import { workspaceRecoil, socketRecoil } from '../../store'
import { hasMyReaction, chageReactionState } from '../../util/reactionUpdate'

function SideThreadBar() {
  const { workspaceId, channelId, chatId } = useParams()
  const [sidebarChat, setSidebarChat] = useState(null)
  const [replyContent, setReplyContent] = useState(null)
  const socket = useRecoilValue(socketRecoil)
  const messageEndRef = useRef()
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)

  const history = useHistory()

  const loadReplyMessage = async (workspaceId, channelId, chatId) => {
    const [data] = await getChatReplyMessage({
      workspaceId,
      channelId,
      chatId,
    })
    if (data) {
      setReplyContent(hasMyReaction(data.reply, workspaceUserInfo))
      setSidebarChat(hasMyReaction([data], workspaceUserInfo))
    }
    if (data === false) history.push(`/workspace/${workspaceId}/${channelId}`)
  }

  const closeSideBar = () => {
    history.push(`/workspace/${workspaceId}/${channelId}`)
  }

  const scrollTo = (targetRef = messageEndRef.current) => {
    if (targetRef) targetRef.scrollIntoView()
  }

  useEffect(() => {
    if (socket) {
      socket.on('new reply', ({ message }) => {
        if (message.chatId === chatId) {
          setReplyContent(messages => [...messages, message])
        }
        scrollTo()
      })
      socket.on('update reaction', ({ reaction }) => {
        if (reaction.chatId === chatId)
          setSidebarChat(chat => chageReactionState(chat, reaction))
        if (reaction.parentId) {
          setReplyContent(reply => chageReactionState(reply, reaction))
        }
      })
    }
    return () => {
      if (socket) {
        socket.off('new message')
        socket.off('update reaction')
      }
    }
  }, [socket, chatId])

  const sendReply = message => {
    const reply = {
      contents: message,
      parentId: chatId,
      channelId,
      userInfo: {
        _id: workspaceUserInfo._id,
        displayName: workspaceUserInfo.displayName,
        profileUrl: workspaceUserInfo.profileUrl,
      },
    }
    socket.emit('new reply', reply)
  }

  useEffect(() => {
    setReplyContent(reply => hasMyReaction(reply, workspaceUserInfo))
    setSidebarChat(chat => hasMyReaction(chat, workspaceUserInfo))
    scrollTo()
  }, [workspaceUserInfo])

  useEffect(() => {
    if (chatId !== undefined) loadReplyMessage(workspaceId, channelId, chatId)
  }, [chatId])

  return (
    <SideThreadBarStyle>
      <SideBarHeader>
        Thread
        <CloseBtn onClick={closeSideBar}>
          <Icon icon={CLOSE} color={COLOR.LABEL_SELECT_TEXT} />
        </CloseBtn>
      </SideBarHeader>
      <SideBarContents>
        <ChatContent>
          {sidebarChat && <ChatMessage {...sidebarChat[0]} type="reply" />}
        </ChatContent>
        <ReplyContents>
          {replyContent &&
            replyContent.map((message, i) => {
              return <ChatMessage key={i} {...message} type="reply" />
            })}
          <div ref={messageEndRef}></div>
        </ReplyContents>
        <MessageEditorArea>
          <MessageEditor channelTitle={'reply'} sendMessage={sendReply} />
        </MessageEditorArea>
      </SideBarContents>
    </SideThreadBarStyle>
  )
}

const SideThreadBarStyle = styled.div`
  width: auto;
  height: calc(100% - 1px);
  background: ${COLOR.BACKGROUND_CONTENTS};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const SideBarHeader = styled.div`
  position: relative;
  width: auto;
  height: 60px;
  color: ${COLOR.LABEL_SELECT_TEXT};
  padding-left: 20px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0;
`

const CloseBtn = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
`

const SideBarContents = styled.div`
  width: auto;
  height: calc(100% - 63px);
  color: ${COLOR.LABEL_SELECT_TEXT};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0;
`

const ChatContent = styled.div`
  width: auto;
  max-height: 30%;
  min-height: 20%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0;
  overflow-y: auto;
`

const ReplyContents = styled.div`
  height: 60%;
  overflow-x: auto;
  overflow-y: auto;
`

const MessageEditorArea = styled.div`
  height: calc(10% - 3px);

  display: flex;
  justify-content: center;
  align-items: flex-end;
`

export default SideThreadBar
