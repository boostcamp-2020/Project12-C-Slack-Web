import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { LOCK, HASHTAG } from '../../constant/icon'

function ChannelCard(props) {
  const { title, channelType } = props.channel
  const { color } = props
  return (
    <ChannelCardLabel>
      <IconImgArea>
        {channelType === 0 ? (
          <Icon icon={LOCK} color={color} />
        ) : (
          <Icon icon={HASHTAG} color={color} />
        )}
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
  color: ${props => props.color};
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default ChannelCard
