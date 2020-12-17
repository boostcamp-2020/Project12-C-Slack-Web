import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'

function ThreadReactionCard({ reaction, updateReactionHandler }) {
  return (
    reaction.users.length !== 0 && (
      <ThreadReactionCardStyle
        onClick={() => updateReactionHandler(reaction.emoji)}
        myReaction={reaction.set}
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
  cursor: pointer;
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
