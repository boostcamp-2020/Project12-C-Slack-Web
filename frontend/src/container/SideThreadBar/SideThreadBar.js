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

function SideThreadBar() {
  const { workspaceId, channelId, chatId } = useParams()
  const [sidebarChat, setSidebarChat] = useState(null)
  const [replyContent, setReplyContent] = useState(null)
  const socket = useRecoilValue(socketRecoil)
  const messageEndRef = useRef(null)
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)

  const history = useHistory()

  const loadReplyMessage = async (workspaceId, channelId, chatId) => {
    const [data] = await getChatReplyMessage({
      workspaceId,
      channelId,
      chatId,
    })
    if (data) {
      setReplyContent(data.reply)
      setSidebarChat(data)
    }
    if (data === false) history.push(`/workspace/${workspaceId}/${channelId}`)
  }

  const closeSideBar = () => {
    history.push(`/workspace/${workspaceId}/${channelId}`)
  }

  const scrollTo = (targetRef = messageEndRef.current) => {
    targetRef.scrollIntoView()
  }

  useEffect(() => {
    socket &&
      socket.on('new reply', ({ message }) => {
        if (message.chatId === chatId) {
          setReplyContent(messages => [...messages, message])
        }
        scrollTo()
      })
    return () => {
      if (socket) {
        socket.off('new reply')
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
          {sidebarChat && <ChatMessage {...sidebarChat} type="reply" />}
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
  )
}

const SideThreadBarStyle = styled.div`
  width: auto;
  height: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
