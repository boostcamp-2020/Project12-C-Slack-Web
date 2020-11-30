import React from 'react'
import styled from 'styled-components'

import UserProfileImg from '../UserProfileImg'

function DirectMessageCard(props) {
  const directMessage = props.directMessage

  return (
    <DirectMessageCardLabel>
      <ImgArea>
        {directMessage.member.length <= 1 ? (
          <UserProfileImg
            user={directMessage.member[0]}
            size="20"
            showActive={true}
          />
        ) : (
          <>
            <UserProfileImg
              user={directMessage.member[0]}
              size="13"
              showActive={false}
            />
            <PeopleNum size="13">{directMessage.member.length}</PeopleNum>
          </>
        )}
      </ImgArea>
      <TitleLabel>
        {directMessage.member.reduce(function (acc, curr, idx) {
          if (idx === 0) return curr.displayName
          return acc + ', ' + curr.displayName
        }, '')}
      </TitleLabel>
    </DirectMessageCardLabel>
  )
}

const DirectMessageCardLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 4px 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`
const ImgArea = styled.div`
  position: relative;
  width: 25px;
  height: 20px;
  margin: 0 10px 0 15px;
  border-radius: 3px;
`

const PeopleNum = styled.div`
  position: absolute;
  display: flex;
  align-items: baseline;
  justify-content: center;
  right: 0;
  bottom: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  font-size: 6px;
  color: white;
  background: black;
  border-radius: 5px;
`

const TitleLabel = styled.div`
  width: 100%;
  padding-right: 15px;
  color: #f0f0f0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
`

export default DirectMessageCard
