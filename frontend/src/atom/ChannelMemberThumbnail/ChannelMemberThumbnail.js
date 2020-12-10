import { faFilter } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'

function ChannelMemberThumbnail(props) {
  const { member, memberNum } = props

  const renderThumbnails = member
    .map((user, index) => {
      if (user === null) return
      if (index > 2) return
      return <Thumbnail key={index} src={user.profileUrl} index={3 - index} />
    })
    .filter(val => val)

  return (
    <MemberInfoArea>
      <ImagesArea>{renderThumbnails}</ImagesArea>
      <MemberCountArea>{memberNum}</MemberCountArea>
    </MemberInfoArea>
  )
}

const MemberInfoArea = styled.div`
  width: auto;
  height: 25px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  &:hover {
    background: rgba(155, 155, 155, 0.2);
  }
`

const ImagesArea = styled.div`
  display: flex;
  flex-direction: row;
`

const Thumbnail = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid ${COLOR.BACKGROUND_CONTENTS};
  border-radius: 4px;
  margin-right: -5px;
  z-index: ${({ index }) => index};
`

const MemberCountArea = styled.div`
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 25px;
  border-radius: 0 4px 4px 0;
`

export default ChannelMemberThumbnail
