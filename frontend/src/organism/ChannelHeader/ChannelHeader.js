import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import ChannelCard from '../../atom/ChannelCard'
import ChannelStarBtn from '../../atom/ChannelStarBtn'
import ChannelPinBtn from '../../atom/ChannelPinBtn'
import ChannelTopicBtn from '../../atom/ChannelTopicBtn'
import ChannelMemberThumbnail from '../../atom/ChannelMemberThumbnail'

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
        if (
          data.data.success &&
          data.data.result.channelId[0].title !== undefined
        ) {
          setChannelInfo(data.data.result)
          setIsLoading(false)
        } else throw '채널 정보 요청 오류'
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
        <SubInfo>
          {channelInfo.pinnedCount !== 0 && (
            <>
              <ChannelPinBtn count={channelInfo.pinnedCount} />
              <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            </>
          )}
          <ChannelTopicBtn topic={channelInfo.channelId[0].topic} />
        </SubInfo>
      </ChannelInfo>
      <ChannelMemberInfo>
        <ChannelMemberThumbnail
          member={channelInfo.member}
          memberNum={channelInfo.memberNum}
        />
      </ChannelMemberInfo>
      <ChannelOption>
        <IconBtn>👤</IconBtn>
        <IconBtn>ℹ️</IconBtn>
      </ChannelOption>
    </ChannelHeaderStyle>
  )
}

const ChannelHeaderStyle = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
`

const ChannelInfo = styled.div`
  flex-grow: 2;
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
  cursor: pointer;
`

const SubInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
`

const ChannelMemberInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`

const ChannelOption = styled.div`
  display: flex;
  flex-direction: row;
`

const IconBtn = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 5px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: rgba(155, 155, 155, 0.2);
  }
`

export default ChannelHeader
