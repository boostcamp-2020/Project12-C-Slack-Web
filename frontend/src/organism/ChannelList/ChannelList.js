import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'
import ChannelCard from '../../atom/ChannelCard'

require('dotenv').config()

function ChannelList(props) {
  const [Channels, setChannels] = useState([])
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      try {
        const data = await request.GET(
          '/api/channel?workspaceUserInfoId=5fbe7a85d01a6e891154b432',
        )
        setChannels(data.result)
      } catch (err) {
        alert('채널 목록을 가져오는데 오류가 발생했습니다.')
        history.goBack()
      }
    })()
  }, [])

  const renderChannelCards = Channels.map((channel, index) => {
    return <ChannelCard key={index} channel={channel} />
  })

  return <ChannelListStyle>{renderChannelCards}</ChannelListStyle>
}

const ChannelListStyle = styled.div`
  width: 100%;
  height: 100%;

  background: black;
`

export default ChannelList
