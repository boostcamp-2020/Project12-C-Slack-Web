import React from 'react'
import styled from 'styled-components'
import Button from '../../presenter/Button'
import { useHistory, useParams } from 'react-router'
import { leaveChannel, joinChannel } from '../../api/channel'
import useChannelList from '../../hooks/useChannelList'
import useWorkspace from '../../hooks/useWorkspace'

function ChannelBrowserCard({
  _id,
  title,
  joined,
  channelType,
  handleClose,
  workspaceUserInfoId,
}) {
  const { workspaceId, channelId } = useParams()
  const [channelList, setChannels] = useChannelList()
  const [workspaceUserInfo] = useWorkspace()
  const history = useHistory()

  const defaultChannel = workspaceUserInfo.workspaceInfo.default_channel

  const clickEvent = async () => {
    if (joined) {
      await leaveChannel({
        workspaceUserInfoId,
        channelId: _id,
      })
      if (channelId === _id) {
        history.push(`/workspace/${workspaceId}/${defaultChannel}`)
      }
    } else {
      await joinChannel({
        workspaceUserInfoId,
        channelId: _id,
      })
    }

    setChannels()
    handleClose()
  }
  return (
    <ChannelBrowserCardStyle>
      <ContentsArea>{title}</ContentsArea>
      <ButtonArea>
        <Button
          handleClick={clickEvent}
          type={joined ? 'leave' : undefined}
          disabled={_id === defaultChannel || (channelType === 0 && !joined)}
          children={
            channelType === 0
              ? 'private'
              : _id === defaultChannel
              ? 'Default channel'
              : joined
              ? 'Leave'
              : 'Join'
          }
        />
      </ButtonArea>
    </ChannelBrowserCardStyle>
  )
}

const ChannelBrowserCardStyle = styled.div`
  width: auto;
  height: 50px;
  border-bottom: 1px solid gray;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ContentsArea = styled.div`
  font-size: 20px;
`
const ButtonArea = styled.div``

export default ChannelBrowserCard
