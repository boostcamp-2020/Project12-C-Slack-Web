import React from 'react'
import styled from 'styled-components'
import Icon from '../Icon'
import { EDIT, CHEVRONDOWN } from '../../constant/icon'

const ICON_SIZE = 13
const ICON_COLOR = '#19181F'

function ChannelListHeader({ workspaceUserInfo }) {
  return workspaceUserInfo !== null ? (
    <ChannelHeader>
      <WorkspaceName>
        <NameArea>{workspaceUserInfo.workspaceInfo.name}</NameArea>

        <Icon icon={CHEVRONDOWN} color="#d1d2d3" size={10 + 'px'} />
      </WorkspaceName>

      <IconButton>
        <Icon icon={EDIT} color={ICON_COLOR} size={ICON_SIZE + 'px'} />
      </IconButton>
    </ChannelHeader>
  ) : (
    <div></div>
  )
}

const ChannelHeader = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 10px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const WorkspaceName = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #d1d2d3;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const NameArea = styled.div`
  margin-right: 15px;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const IconButton = styled.div`
  min-width: 35px;
  height: 35px;
  background-color: #d1d2d3;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ChannelListHeader
