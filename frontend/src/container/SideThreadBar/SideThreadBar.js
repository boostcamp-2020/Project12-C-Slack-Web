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
import DraggableBoundaryLine from '../../presenter/DraggableBoundaryLine'
import { SOCKET_EVENT } from '../../constant'
function SideThreadBar({ sidebarWidth, setSidebarWidth }) {
  const { workspaceId, channelId, chatId } = useParams()
  const [sidebarChat, setSidebarChat] = useState(null)
  const [replyContent, setReplyContent] = useState(null)
  const socket = useRecoilValue(socketRecoil)
  const messageEndRef = useRef()
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)
  const history = useHistory()

  useEffect(() => {
    setSidebarWidth(350)

    return () => {
      setSidebarWidth(0)
    }
  }, [])

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
      socket.on(SOCKET_EVENT.NEW_REPLY, ({ message }) => {
        if (message.chatId === chatId) {
          setReplyContent(messages => [...messages, message])
        }
        scrollTo()
      })
      socket.on(SOCKET_EVENT.UPDAETE_REACTION, ({ reaction }) => {
        if (reaction.chatId === chatId)
          setSidebarChat(chat =>
            chageReactionState(chat, reaction, workspaceUserInfo),
          )
        if (reaction.parentId) {
          setReplyContent(reply =>
            chageReactionState(reply, reaction, workspaceUserInfo),
          )
        }
      })
    }
    return () => {
      if (socket) {
        socket.off(SOCKET_EVENT.NEW_REPLY)
        socket.off(SOCKET_EVENT.UPDAETE_REACTION)
      }
    }
  }, [socket, chatId])

  const sendReply = (message, file) => {
    const reply = {
      contents: message,
      parentId: chatId,
      channelId,
      file: file,
      userInfo: {
        _id: workspaceUserInfo._id,
        displayName: workspaceUserInfo.displayName,
        profileUrl: workspaceUserInfo.profileUrl,
      },
    }
    socket.emit(SOCKET_EVENT.NEW_REPLY, reply)
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
    <>
      <DraggableBoundaryLine
        setWidth={setSidebarWidth}
        reverse={true}
        min="300"
        max="700"
        color={COLOR.TRANSPARENT_GRAY}
      />
      <SideThreadBarStyle width={sidebarWidth}>
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

          {replyContent && (
            <CountReplyArea>
              <CountReply>
                {`${replyContent.length} ${
                  replyContent.length === 1 ? 'reply' : 'replies'
                } `}
              </CountReply>
              <Separator />
            </CountReplyArea>
          )}
          {replyContent &&
            replyContent.map((message, i) => {
              return <ChatMessage key={i} {...message} type="reply" />
            })}
          <div ref={messageEndRef} />
          <MessageEditor placeholder={'reply...'} sendMessage={sendReply} />
        </SideBarContents>
      </SideThreadBarStyle>
    </>
  )
}

const SideThreadBarStyle = styled.div`
  width: ${props => props.width}px;
  height: 100%;
  border-left: 1px solid ${COLOR.TRANSPARENT_GRAY};
  box-sizing: border-box;
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
  box-sizing: border-box;
  border-right: 0;
  background-color: ${COLOR.BACKGROUND_CONTENTS};
`

const CloseBtn = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
`

const SideBarContents = styled.div`
  width: auto;
  height: calc(100% - 60px);
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0;
  box-sizing: border-box;
`

const ChatContent = styled.div`
  width: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0;
  overflow-y: auto;
`
const Separator = styled.div`
  border-bottom: 1px solid ${COLOR.GRAY};
  width: 100%;
`
const CountReply = styled.div`
  min-width: max-content;
  margin-right: 5px;
`
const CountReplyArea = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${COLOR.GRAY};
  display: flex;
  padding: 16px;
  align-items: center;
`
export default SideThreadBar
