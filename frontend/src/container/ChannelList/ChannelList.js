import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import SectionLabel from '../SectionLabel'
import SideMenuList from '../../presenter/SideMenuList'
import { useRecoilValue } from 'recoil'
import { isEmpty } from '../../util'
import { workspaceRecoil } from '../../store'
import useChannelList from '../../hooks/useChannelList'

function ChannelList() {
  const [list, setList] = useState([])
  const [channels] = useChannelList()
  const userInfo = useRecoilValue(workspaceRecoil)
  const history = useHistory()

  const sectionMap = new Map()

  useEffect(() => {
    if (channels === undefined) return
    if (!isEmpty(channels)) {
      if (userInfo.sections)
        userInfo.sections.map(sectionName => {
          sectionMap.set(sectionName, [])
        })
      SectionOrganizing()
    }
  }, [channels])

  const SectionOrganizing = () => {
    try {
      channels.forEach(channel => {
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

  const renderChannelSectionList = list.map(([sectionName, lists], index) => {
    return (
      <SectionLabel
        key={index}
        sectionName={sectionName}
        lists={lists}
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
  if (map.has(key)) map.set(key, [...map.get(key)].concat(data))
  else map.set(key, [data])
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
