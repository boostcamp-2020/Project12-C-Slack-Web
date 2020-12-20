import React, { useState, forwardRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import UserProfileImg from '../../presenter/UserProfileImg'
import ChatContent from '../../presenter/ChatContent'
import ThreadReactionList from '../../presenter/ThreadReactionList'
import ActionBar from '../ActionBar'
import ViewThreadButton from '../../presenter/Button/ViewThreadButton'
import { isEmpty } from '../../util'
import { SIZE, COLOR } from '../../constant/style'
import { workspaceRecoil, socketRecoil } from '../../store'
import FilePreview from '../FilePreview'
import { SOCKET_EVENT } from '../../constant'
const ChatMessage = forwardRef(
  (
    {
      userInfo,
      reply,
      reactions,
      _id,
      createdAt,
      parentId,
      contents,
      type = 'chat',
      file,
    },
    ref,
  ) => {
    const { workspaceId, channelId } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [hover, setHover] = useState(false)
    const workspaceUserInfo = useRecoilValue(workspaceRecoil)
    const socket = useRecoilValue(socketRecoil)

    const updateReaction = ({ emoji, chatId, channelId, type }) => {
      const reaction = {
        emoji,
        chatId,
        channelId,
        parentId,
        type,
        userInfo: {
          _id: workspaceUserInfo._id,
          displayName: workspaceUserInfo.displayName,
        },
      }
      socket.emit(SOCKET_EVENT.UPDAETE_REACTION, reaction)
    }

    const updateReactionHandler = emoji => {
      let done = false
      reactions.map(reaction => {
        if (reaction.emoji === emoji) {
          if (reaction.set) {
            updateReaction({
              emoji: emoji.native || emoji,
              chatId: _id,
              channelId,
              type: 0,
            })
            done = true
          }
        }
      })
      if (!done) {
        updateReaction({
          emoji: emoji.native || emoji,
          chatId: _id,
          channelId,
          type: 1,
        })
      }
    }

    const renderFilePreview = () => {
      if (isEmpty(file)) return
      return <FilePreview type="message" file={file} />
    }

    return (
      <StyledMessageContainer
        type={type}
        ref={ref}
        id={createdAt}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <MessageContents>
          <UserProfileImg
            user={{ profileUrl: userInfo.profileUrl }}
            size={SIZE.CHAT_PROFILE}
            type={type}
          />
          <ChatContent
            displayName={userInfo.displayName}
            createdAt={createdAt}
            contents={contents}
            fileContents={renderFilePreview()}
          />
        </MessageContents>

        {!isEmpty(reactions) && (
          <ThreadReactionStyle>
            <ThreadReactionList
              reactions={reactions}
              chatId={_id}
              updateReactionHandler={updateReactionHandler}
            />
          </ThreadReactionStyle>
        )}

        {type !== 'reply' && !isEmpty(reply) && (
          <StyleLink to={`/workspace/${workspaceId}/${channelId}/${_id}`}>
            <ViewThreadBarStyle>
              <ViewThreadButton reply={reply} />
            </ViewThreadBarStyle>
          </StyleLink>
        )}

        {(hover || openModal) && (
          <ActionBarStyle openModal={openModal} type={type}>
            <ActionBar
              setOpenModal={setOpenModal}
              chatId={_id}
              updateReactionHandler={updateReactionHandler}
              type={type}
            />
          </ActionBarStyle>
        )}
      </StyledMessageContainer>
    )
  },
)

const ActionBarStyle = styled.div`
  position: absolute;
  ${({ type }) => {
    if (type === 'reply') return 'width: 100px;'
    return 'width: 300px;'
  }}
  height: 30px;
  right: 10px;
  border-radius: 5px;
  display: flex;
`
const MessageContents = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 5px 0;
`

const StyledMessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: -webkit-fill-available;
  ${({ type }) => {
    if (type === 'reply') return 'padding: 8px 24px 8px 16px;'
    return 'padding: 8px 20px;'
  }}
  &:hover {
    background-color: ${COLOR.HOVER_GRAY};
  }
`

const ViewThreadBarStyle = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
`

const ThreadReactionStyle = styled.div`
  width: auto;
  min-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
`

const StyleLink = styled(NavLink)`
  text-decoration: none;
  color: ${COLOR.STARBLUE};
  background-color: ${COLOR.WHITE};
  border: 1px solid transparent;
  padding: 5px;
  margin-left: 15px;
  &:hover {
    border: 1px solid ${COLOR.LIGHT_GRAY};
    border-radius: 5px;
  }
`
export default ChatMessage
