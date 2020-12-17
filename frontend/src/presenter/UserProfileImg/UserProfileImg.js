import React from 'react'
import styled from 'styled-components'
import UserActive from '../UserActive'

const UserProfileImg = ({ user, size, showActive, type = 'default' }) => {
  return (
    <UserProfileImgStyle size={size}>
      <ProfileImg src={user && user.profileUrl} size={size} type={type} />
      {showActive && (
        <UserActiveArea>
          <UserActive isActive={user && user.isActive} />
        </UserActiveArea>
      )}
    </UserProfileImgStyle>
  )
}

const UserProfileImgStyle = styled.div`
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  min-width: 25px;
  position: relative;
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

const UserActiveArea = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  right: -2px;
  bottom: -2px;
`

export default UserProfileImg
