import React, { useEffect } from 'react'
import channelAtom from '../recoil/channelAtom'
import workspaceUserInfoAtom from '../recoil/workspaceUserInfoAtom'
import { useRecoilState } from 'recoil'

import request from '../util/request'

const useChannelList = () => {
  const [Channels, setChannels] = useRecoilState(channelAtom)
  const [workspaceUserInfo, setWorkspaceUserInfo] = useRecoilState(
    workspaceUserInfoAtom,
  )

  useEffect(() => {
    if (Object.keys(Channels).length === 0) {
      ;(async () => {
        try {
          const data = await request.GET(
            '/api/channel?workspaceUserInfoId=5fc4fe427b2d5f6ae44dc15e',
          )
          if (data.data.success) {
            setWorkspaceUserInfo(data.data.result.userInfo[0])
            setChannels(data.data.result.channelConfig)
          } else throw '채널 목록 요청 오류'
        } catch (err) {
          console.error(err)
        }
      })()
    }
  }, [])

  const updateChannelList = async () => {
    try {
      const data = await request.GET(
        '/api/channel?workspaceUserInfoId=5fc4fe427b2d5f6ae44dc15e',
      )
      if (data.data.success) {
        setChannels(data.data.result.channelConfig)
        setWorkspaceUserInfo(data.data.result.userInfo[0])
      } else throw '채널 목록 요청 오류'
    } catch (err) {
      console.error(err)
    }
  }

  return [Channels, updateChannelList]
}

export default useChannelList