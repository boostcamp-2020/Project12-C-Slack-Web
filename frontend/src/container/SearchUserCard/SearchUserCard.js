import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import UserActive from '../../presenter/UserActive'
import { COLOR } from '../../constant/style'
import Icon from '../../presenter/Icon'
import { CHECK } from '../../constant/icon'

function SearchUserCard({ userInfo, state, setState }) {
  const [ExistList, setExistList] = useState(false)

  useEffect(() => {
    setExistList(false)
    if (state.length === 0) return false
    const result = state.every(val => {
      return val._id !== userInfo._id
    })

    if (!result) {
      setExistList(true)
    }
  }, [state, userInfo])

  const addUserEvent = userInfo => {
    if (userInfo.isExist || ExistList) return false

    setState([...state, userInfo])
  }

  return (
    <SearchUserCardStyle
      isExist={userInfo.isExist || ExistList}
      onClick={() => addUserEvent(userInfo)}
    >
      {ExistList || userInfo.isExist ? (
        <ExistCheck>
          <Icon icon={CHECK} size="10px" />
        </ExistCheck>
      ) : (
        <ExistCheck> </ExistCheck>
      )}
      <ProfileImg src={userInfo.profileUrl} />
      <DisplayName>{userInfo.displayName}</DisplayName>
      <UserActive isActive={userInfo.isActive} />
      <FullName>{userInfo.fullName}</FullName>
      {userInfo.isExist && (
        <ExistNoticeArea>Already in this channel</ExistNoticeArea>
      )}
    </SearchUserCardStyle>
  )
}

const SearchUserCardStyle = styled.div`
  width: auto;
  height: 30px;
  padding: 3px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  ${({ isExist }) =>
    !isExist
      ? css`
          cursor: pointer;
          &:hover {
            background-color: ${COLOR.LABEL_SELECT_BACKGROUND};
            color: ${COLOR.LABEL_SELECT_TEXT};
          }
        `
      : css`
          &:hover {
            background-color: rgba(255, 255, 255, 0.4);
          }
        `}
`

const ExistCheck = styled.div`
  width: 15px;
`

const ProfileImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 5px;
`

const DisplayName = styled.div`
  font-weight: 700;
  margin: 0 10px 0 10px;
`

const FullName = styled.div`
  font-weight: 200;
  margin-left: 10px;
`

const ExistNoticeArea = styled.div`
  position: absolute;
  font-size: 12px;
  font-weight: 200;
  right: 10px;
`

export default SearchUserCard
