import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useRecoilState } from 'recoil'
import { workspaceRecoil } from '../../store'
import { COLOR } from '../../constant/style'

function ThreadReactionCard({ emoji, users }) {
  const [userInfo, setUserInfo] = useRecoilState(workspaceRecoil)
  const [myReaction, setMyReaction] = useState(false)

  useEffect(() => {
    setMyReaction(hasMyReaction())
  }, [])

  const hasMyReaction = () => {
    const result = users.every(user => {
      return user._id !== userInfo._id
    })
    return !result
  }

  const removeMyReaction = () => {
    console.log('TODO: remove my reaction', emoji)
  }

  const addMyReaction = () => {
    console.log('TODO: add my reaction', emoji)
  }

  return (
    <ThreadReactionCardStyle
      onClick={myReaction ? removeMyReaction : addMyReaction}
      myReaction={myReaction}
    >
      <EmotionArea>{emoji}</EmotionArea>
      <UserNumArea>{users.length}</UserNumArea>
    </ThreadReactionCardStyle>
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
