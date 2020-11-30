import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import SectionLabel from '../SectionLabel'

function ChannelList(props) {
  const [channels, setChannels] = useState([])
  const [list, setList] = useState([])
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      try {
        const data = await request.GET(
          '/api/channel?workspaceUserInfoId=5fc4fe427b2d5f6ae44dc15e',
        )

        if (data.data.success) setChannels(data.data.result)
        else throw '채널 목록 요청 오류'
      } catch (err) {
        toast.error('채널 목록을 가져오는데 오류가 발생했습니다.', {
          onClose: () => history.goBack(),
        })
      }
    })()
  }, [])

  useEffect(() => {
    SectionOrganizing()
  }, [channels])

  let sections = new Map()
  const SectionOrganizing = () => {
    try {
      channels.map((channel, index) => {
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
      toast.error('채널 목록 설정 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  const renderChannelSectionList = list.map((section, index) => {
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
