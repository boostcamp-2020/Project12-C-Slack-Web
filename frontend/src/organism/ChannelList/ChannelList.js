import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'

import SectionLabel from '../SectionLabel'

require('dotenv').config()

function ChannelList(props) {
  const [Channels, setChannels] = useState([])
  const [List, setList] = useState([])
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      try {
        const data = await request.GET(
          '/api/channel?workspaceUserInfoId=5fbe7a85d01a6e891154b432',
        )

        if (data.data.success) setChannels(data.data.result)
      } catch (err) {
        alert('채널 목록을 가져오는데 오류가 발생했습니다.')
        history.goBack()
      }
    })()
  }, [])

  useEffect(() => {
    SectionOrganizing()
  }, [Channels])

  let sections = new Map()
  const SectionOrganizing = () => {
    try {
      Channels.map((channel, index) => {
        if (channel.sectionId === null && channel.channelType === 2) {
          if (sections.has('Direct messages')) {
            let value = sections.get('Direct messages')
            value.push(channel)
            sections.set('Direct messages', value)
          } else {
            sections.set('Direct messages', [channel])
          }
        } else {
          if (sections.has(channel.sectionId)) {
            let value = sections.get(channel.sectionId)
            value.push(channel)
            sections.set(channel.sectionId, value)
          } else {
            sections.set(channel.sectionId, [channel])
          }
        }
      })
      setList([...sections])
    } catch (err) {
      alert('채널 목록 설정 오류가 발생했습니다.')
      history.goBack()
    }
  }

  const renderChannelSectionList = List.map((section, index) => {
    return (
      <SectionLabel
        key={index}
        sectionName={section[0] === null ? 'Channels' : section[0]}
        lists={section[1]}
      ></SectionLabel>
    )
  })

  return <ChannelListStyle>{renderChannelSectionList}</ChannelListStyle>
}

const ChannelListStyle = styled.div`
  width: 100%;
  height: 100%;

  background: black;
`

export default ChannelList
