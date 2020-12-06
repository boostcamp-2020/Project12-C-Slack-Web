import React from 'react'
import styled from 'styled-components'
import Icon from '../Icon'
import { THUMBTACK } from '../../constant/icon'
import { COLOR } from '../../constant/style'

function ChannelPinBtn(props) {
  const { count } = props
  return (
    <ChannelPinBtnArea>
      <IconStyle>
        <Icon
          icon={THUMBTACK}
          size="12px"
          color={COLOR.LABEL_SELECT_SUB_TEXT}
        />
      </IconStyle>
      {count}
    </ChannelPinBtnArea>
  )
}

const ChannelPinBtnArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const IconStyle = styled.div`
  transform: rotate(-30deg);
  padding-left: 2px;
  margin-right: 10px;
`

export default ChannelPinBtn
