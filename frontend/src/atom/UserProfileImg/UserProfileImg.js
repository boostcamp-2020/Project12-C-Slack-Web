import React from 'react'
import styled from 'styled-components'
import UserActive from '../UserActive'

const UserProfileImg = ({ user, size, showActive, type = 'default' }) => {
  return (
    <UserProfileImgStyle size={size}>
      <ProfileImg src={user.profileUrl} size={size} type={type} />
      {showActive && <UserActive isActive={user.isActive} />}
    </UserProfileImgStyle>
  )
}

const UserProfileImgStyle = styled.div`
  min-width: 25px;
`

const ProfileImg = styled.img`
  ${({ type }) => {
    if (type === 'chat') return 'display: inline-block;'
    return `
      position: absolute;
      display: flex;
      left: 0;
      top: 0;
    `
  }}
  &:hover {
    cursor: pointer;
  }
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 3px;
`

export default UserProfileImg
