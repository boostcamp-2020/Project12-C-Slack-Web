import React from 'react'
import styled from 'styled-components'
import UserActive from '../UserActive'

function UserProfileImg(props) {
  const { user, size, showActive } = props

  return (
    <>
      <ProfileImg src={user.profileUrl} size={size} />
      {showActive && <UserActive isActive={user.isActive} />}
    </>
  )
}

const ProfileImg = styled.img`
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 3px;
`

export default UserProfileImg
