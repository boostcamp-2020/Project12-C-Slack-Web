import React from 'react'
import styled from 'styled-components'
import UserProfileImg from '../UserProfileImg'
import { COLOR } from '../../constant/style'
import Icon from '../Icon'
import { CLOSE } from '../../constant/icon'

function SelectedUserCard({ userInfo, inviteUserList, setInviteUserList }) {
  const removeFromList = () => {
    const result = inviteUserList
      .map((user, idx) => {
        if (user._id !== userInfo._id) return user
      })
      .filter(val => val)
    setInviteUserList(result)
  }

  return (
    <SelectedUserCardStyle>
      <UserProfileImg user={userInfo} size="35" showActive={false} />
      <DisplayName>{userInfo.displayName}</DisplayName>
      <CloseBtn onClick={removeFromList}>
        <Icon icon={CLOSE} size="15px" />
      </CloseBtn>
    </SelectedUserCardStyle>
  )
}

const SelectedUserCardStyle = styled.div`
  width: auto;
  height: 35px;
  font-weight: 600;
  border-radius: 5px;
  margin: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${COLOR.BACKGROUNT_SELECTED_USER_CARD};
  cursor: pointer;
`

const DisplayName = styled.div`
  padding: 0 5px;
`
const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export default SelectedUserCard
