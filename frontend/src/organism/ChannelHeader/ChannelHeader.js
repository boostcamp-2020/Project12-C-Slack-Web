import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'
import { toast } from 'react-toastify'

function ChannelHeader({ match }) {
  const { channelId } = match.params
  const [channelInfo, setChannelInfo] = useState('')
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      try {
        const data = await request.GET('/api/channel/' + channelId + '/info')
        if (data.data.success) setChannelInfo(data.data.result)
        else throw '채널 정보 요청 오류'
      } catch (err) {
        toast.error('채널 정보를 가져오는데 오류가 발생했습니다.', {
          onClose: () => history.goBack(),
        })
      }
    })()
  }, [])

  return <ChannelHeaderStyle>{channelInfo.title}</ChannelHeaderStyle>
}

const ChannelHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export default ChannelHeader
