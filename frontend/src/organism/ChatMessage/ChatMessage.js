import React, { useState, forwardRef } from 'react'
import styled from 'styled-components'
import UserProfileImg from '../../atom/UserProfileImg'
import ChatContent from '../../atom/ChatContent'
import ThreadReactionList from '../ThreadReactionList'
import ActionBar from '../ActionBar'
import { SIZE, COLOR } from '../../constant/style'
import { workspaceRecoil, socketRecoil } from '../../store'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'

const ChatMessage = forwardRef(
  (
    { userInfo, reply, reactions, _id, createdAt, contents, type = 'chat' },
    ref,
  ) => {
    const { channelId } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [hover, setHover] = useState(false)
    const workspaceUserInfo = useRecoilValue(workspaceRecoil)
    const socket = useRecoilValue(socketRecoil)

    const updateReaction = ({ emoji, chatId, channelId, type }) => {
      const reaction = {
        emoji,
        chatId,
        channelId,
        type,
        userInfo: {
          _id: workspaceUserInfo._id,
          displayName: workspaceUserInfo.displayName,
        },
      }
      socket.emit('update reaction', reaction)
    }

    const updateReactionHandler = emoji => {
      let done = false
      reactions.map((reaction, idx) => {
        if (reaction.emoji === emoji.native || reaction.emoji === emoji) {
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
            type="chat"
          />
          <ChatContent
            displayName={userInfo.displayName}
            createdAt={createdAt}
            contents={contents}
          />
        </MessageContents>
        {/* TODO thread Reaction 구현  */}
        {reactions && reactions.length !== 0 && (
          <ThreadReactionStyle>
            <ThreadReactionList
              reactions={reactions}
              chatId={_id}
              updateReactionHandler={updateReactionHandler}
            />
          </ThreadReactionStyle>
        )}
        {/* TODO view thread reply 구현  */}
        {reply && reply.length !== 0 && (
          <ViewThreadBarStyle>view thread</ViewThreadBarStyle>
        )}

        {/* TODO Action bar 구현 */}
        {(hover || openModal) && (
          <ActionBarStyle openModal={openModal}>
            <ActionBar
              setOpenModal={setOpenModal}
              chatId={_id}
              updateReactionHandler={updateReactionHandler}
            />
          </ActionBarStyle>
        )}
      </StyledMessageContainer>
    )
  },
)

const ActionBarStyle = styled.div`
  position: absolute;
  width: 300px;
  height: 30px;
  top: -15px;
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
  height: 30px;
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
export default ChatMessage
