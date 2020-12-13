import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { workspaceRecoil, socketRecoil } from '../../store'
import { COLOR } from '../../constant/style'
import updateReaction from '../../util/updateReaction'

function ThreadReactionCard({ reaction, chatId }) {
  const { channelId } = useParams()
  const socket = useRecoilValue(socketRecoil)
  const [userInfo, setUserInfo] = useRecoilState(workspaceRecoil)
  const [myReaction, setMyReaction] = useState(false)

  useEffect(() => {
    setMyReaction(hasMyReaction())
  }, [reaction.users.length])

  const hasMyReaction = () => {
    if (reaction.users[0] === undefined) return false
    const result = reaction.users.every(user => {
      return user && user._id !== null && user._id !== userInfo._id
    })
    return !result
  }

  const updateReactions = () => {
    updateReaction({
      workspaceUserInfo: userInfo,
      socket,
      emoji: reaction.emoji,
      chatId,
      channelId,
    })
  }

  return (
    reaction.users.length !== 0 && (
      <ThreadReactionCardStyle
        onClick={updateReactions}
        myReaction={myReaction}
      >
        <EmotionArea>{reaction.emoji}</EmotionArea>
        <UserNumArea>{reaction.users.length}</UserNumArea>
      </ThreadReactionCardStyle>
    )
  )
}

const ThreadReactionCardStyle = styled.div`
  min-width: 20px;
  height: 20px;
  padding: 0 7px;
  margin: 0 10px 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  border: 1px solid
    ${props => {
      return props.myReaction ? COLOR.REACTION_MINE_TEXT_AND_LINE : 'gray'
    }};

  color: ${props => {
    return props.myReaction ? COLOR.REACTION_MINE_TEXT_AND_LINE : 'black'
  }};

  background: ${props => {
    return props.myReaction ? COLOR.BACKGROUND_REACTION_MINE : COLOR.HOVER_GRAY
  }};
`
const EmotionArea = styled.div`
  display: flex;
  line-height: 20px;
  flex-direction: row;
  align-items: center;
`

const UserNumArea = styled.div`
  margin-left: 5px;
  line-height: 20px;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default ThreadReactionCard
