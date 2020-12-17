import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { LOCK, HASHTAG } from '../../constant/icon'
import dmTitleGenerator from '../../util/dmTitleGenerator'

function ChannelCard(props) {
  const { title, channelType } = props.channel
  const { color } = props

  return (
    <ChannelCardLabel>
      <IconImgArea>
        <Icon
          icon={channelType === 0 ? LOCK : HASHTAG}
          color={color}
          size="13px"
        />
      </IconImgArea>
      <TitleLabel color={color}>
        {props.channel.channelType === 2
          ? dmTitleGenerator(props.member)
          : title}
      </TitleLabel>
    </ChannelCardLabel>
  )
}
const ChannelCardLabel = styled.div`
  width: auto;
  padding: 4px 0;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: baseline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
