import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import ChannelCard from '../../atom/ChannelCard'
import ChannelStarBtn from '../../atom/ChannelStarBtn'

function ChannelHeader({ match }) {
  const { channelId } = match.params
  const [channelInfo, setChannelInfo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      try {
        const data = await request.GET(
          '/api/channel/' +
            channelId +
            '/info?workspaceUserInfoId=5fc4fe427b2d5f6ae44dc15e',
        )
        if (data.data.success) setChannelInfo(data.data.result)
        else throw '채널 정보 요청 오류'
        setIsLoading(false)
      } catch (err) {
        toast.error('채널 정보를 가져오는데 오류가 발생했습니다.', {
          onClose: () => history.goBack(),
        })
      }
    })()
  }, [])

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <ChannelHeaderStyle>
      <ChannelInfo>
        <MainInfo>
          <ChannelCard channel={channelInfo.channelId[0]} color="black" />
          <ChannelStarBtn section={channelInfo.sectionId[0]} />
        </MainInfo>
        <SubInfo>서브 info</SubInfo>
      </ChannelInfo>
      <ChannelMemberInfo>member info</ChannelMemberInfo>
      <ChannelOption>option btn</ChannelOption>
    </ChannelHeaderStyle>
  )
}

const ChannelHeaderStyle = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 800;
  font-size: 17px;
`

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
`

const ChannelMemberInfo = styled.div`
  display: flex;
  flex-direction: row;
`

const ChannelOption = styled.div`
  display: flex;
  flex-direction: row;
`

export default ChannelHeader
