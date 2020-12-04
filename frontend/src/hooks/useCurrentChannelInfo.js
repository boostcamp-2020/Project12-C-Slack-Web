import React, { useEffect } from 'react'
import { channelInfoAtom } from '../store'
import { useRecoilState } from 'recoil'

import request from '../util/request'

const useCurrentChannelInfo = () => {
  const [channelInfo, setChannelInfo] = useRecoilState(channelInfoAtom)

  const updateChannelInfo = async channelId => {
    const { data } = await request.GET(
      '/api/channel/' +
        channelId +
        '/info?workspaceUserInfoId=5fc4fe427b2d5f6ae44dc15e',
    )
    if (data.success && data.result.channelId.title !== undefined) {
      setChannelInfo(data.result)
    } else throw '채널 정보 요청 오류'
  }

  return [channelInfo, updateChannelInfo]
}

export default useCurrentChannelInfo
