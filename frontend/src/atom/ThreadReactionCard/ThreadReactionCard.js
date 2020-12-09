import React from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { workspaceRecoil } from '../../store'

function ThreadReactionCard({ emotion, users }) {
  const [userInfo, setUserInfo] = useRecoilState(workspaceRecoil)

  return (
    <ThreadReactionCardStyle>
      <EmotionArea>{emotion}</EmotionArea>
      <UserNumArea>{users.length}</UserNumArea>
    </ThreadReactionCardStyle>
  )
}

const ThreadReactionCardStyle = styled.div`
  min-width: 20px;
  height: 20px;
  padding: 0 7px;
  margin: 0 10px 5px 0;
  border-radius: 20px;
  border: 1px solid gray;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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
