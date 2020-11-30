import React from 'react'
import styled from 'styled-components'
import lockImg from './locker.svg'
import hashImg from './hash.svg'

function ChannelCard(props) {
  const { title, channelType } = props.channel
  return (
    <ChannelCardLabel>
      <IconImgArea>
        <img src={channelType == 0 ? lockImg : hashImg} />
      </IconImgArea>
      <TitleLabel>{title}</TitleLabel>
    </ChannelCardLabel>
  )
}
const ChannelCardLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: baseline;
  padding: 4px 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`
const IconImgArea = styled.div`
  min-width: 12px;
  min-height: 12px;
  margin: 0 10px 0 15px;
`

const TitleLabel = styled.div`
  padding-right: 15px;
  color: #f0f0f0;
  word-break: break-all;
  display: inline-block;
`

export default ChannelCard
