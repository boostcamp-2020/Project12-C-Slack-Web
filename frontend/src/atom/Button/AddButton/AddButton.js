import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../../constant/style'
import { PLUSSQURE } from '../../../constant/icon'
import Icon from '../../Icon'

function AddButton({ isOpen, title, onClick }) {
  const color = COLOR.LABEL_DEFAULT_TEXT
  return (
    <ChannelLabel isOpen={isOpen} onClick={onClick}>
      <ChannelCardLabel>
        <IconImgArea>
          <Icon icon={PLUSSQURE} color={color} size="13px" />
        </IconImgArea>
        <TitleLabel color={color}>{title}</TitleLabel>
      </ChannelCardLabel>
    </ChannelLabel>
  )
}

const ChannelLabel = styled.div`
  width: auto;
  padding: 3px 10px 3px 30px;

  cursor: pointer;
  &:hover {
    background-color: ${props => {
      if (!props.curr) return COLOR.LABEL_HOVER_BACKGROUND
      return null
    }};
  }
  display: ${props => {
    if (!props.isOpen && !props.curr) {
      return 'none'
    }
  }};
  background: ${props => {
    if (props.curr) {
      return COLOR.LABEL_SELECT_BACKGROUND
    }
  }};
  color: ${props => {
    if (props.curr) {
      return COLOR.LABEL_SELECT_TEXT
    } else {
      return COLOR.LABEL_DEFAULT_TEXT
    }
  }};
`

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

export default AddButton
