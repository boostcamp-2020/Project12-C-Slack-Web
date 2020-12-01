import React from 'react'
import styled from 'styled-components'
import lockImg from './locker.svg'
import hashImg from './hash.svg'

function ChannelCard(props) {
  const { title, channelType } = props.channel
  const { color } = props
  return (
    <ChannelCardLabel>
      <IconImgArea>
        <img src={channelType == 0 ? lockImg : hashImg} />
      </IconImgArea>
      <TitleLabel color={color}>{title}</TitleLabel>
    </ChannelCardLabel>
  )
}
const ChannelCardLabel = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: baseline;
  padding: 4px 0;
`
const IconImgArea = styled.div`
  min-width: 12px;
  min-height: 12px;
  margin-right: 10px;
`

const TitleLabel = styled.div`
  width: auto;
  color: ${props => props.color || '#f0f0f0'};
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default ChannelCard
