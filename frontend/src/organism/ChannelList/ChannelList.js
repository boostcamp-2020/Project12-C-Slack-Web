import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import SectionLabel from '../SectionLabel'
import SideMenuList from '../SideMenuList'
import { useRecoilState, useRecoilValue } from 'recoil'

import { workspaceRecoil, socketRecoil } from '../../store'
import useChannelList from '../../hooks/useChannelList'

function ChannelList(props) {
  const [list, setList] = useState([])
  const [Channels, setChannels] = useChannelList()
  const [userInfo, setUserInfo] = useRecoilState(workspaceRecoil)
  const socket = useRecoilValue(socketRecoil)
  const history = useHistory()

  let sectionMap = new Map()
  useEffect(() => {
    if (socket)
      socket.on('invited channel', () => {
        setChannels()
      })
  }, [socket])
  useEffect(() => {
    if (Channels === undefined) return
    if (Object.keys(Channels).length !== 0) {
      if (userInfo.sections)
        userInfo.sections.map((sectionName, idx) => {
          sectionMap.set(sectionName, [])
        })
      SectionOrganizing()
    }
  }, [Channels])

  const SectionOrganizing = () => {
    try {
      Channels.map((channel, index) => {
        if (channel.sectionName == null) {
          if (channel.channelId.channelType === 2) {
            checkHasKeyAndSetKeyInMap(sectionMap, 'Direct messages', channel)
          } else {
            checkHasKeyAndSetKeyInMap(sectionMap, 'Channels', channel)
          }
        } else {
          checkHasKeyAndSetKeyInMap(sectionMap, channel.sectionName, channel)
        }
      })
      checkHasDefaultChannel(sectionMap)
      setList([...sectionMap])
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
        sectionName={section[0]}
        lists={section[1]}
      ></SectionLabel>
    )
  })

  return (
    <ChannelListStyle>
      <SideMenuList />
      {renderChannelSectionList}
    </ChannelListStyle>
  )
}

const checkHasKeyAndSetKeyInMap = (map, key, data) => {
  if (map.has(key)) {
    let value = map.get(key)
    value.push(data)
    map.set(key, value)
  } else {
    map.set(key, [data])
  }
}

const checkHasDefaultChannel = map => {
  if (!map.has('Channels')) {
    map.set('Channels', [])
  }
  if (!map.has('Direct messages')) {
    map.set('Direct messages', [])
  }
}

const ChannelListStyle = styled.div`
  width: 100%;
  height: 100%;
`

export default ChannelList
