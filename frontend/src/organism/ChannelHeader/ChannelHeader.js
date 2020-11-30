import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'

function ChannelHeader({ match }) {
  const { channelId } = match.params
  const [ChannelInfo, setChannelInfo] = useState('')
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      try {
        const data = await request.GET('/api/channel/' + channelId + '/info')
        if (data.success) setChannelInfo(data.result)
        else throw new Error('채널 정보를 가져오는데 오류가 발생했습니다.')
      } catch (err) {
        alert('채널 정보를 가져오는데 오류가 발생했습니다.')
        history.goBack()
      }
    })()
  }, [])

  return <ChannelHeaderStyle>{ChannelInfo.title}</ChannelHeaderStyle>
}

const ChannelHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export default ChannelHeader
