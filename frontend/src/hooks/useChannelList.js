import React, { useEffect } from 'react'
import { channelAtom, workspaceUserInfoAtom } from '../store'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

import request from '../util/request'

const useChannelList = () => {
  const [Channels, setChannels] = useRecoilState(channelAtom)
  const [workspaceUserInfo, setWorkspaceUserInfo] = useRecoilState(
    workspaceUserInfoAtom,
  )

  const history = useHistory()
  const getList = async () => {
    try {
      const { data } = await request.GET(
        '/api/channel?workspaceUserInfoId=5fc4fe427b2d5f6ae44dc15e',
      )
      if (data.success) {
        setWorkspaceUserInfo(data.result.userInfo[0])
        setChannels(data.result.channelConfig)
      } else throw '채널 목록 요청 오류'
    } catch (err) {
      toast.error('채널 목록 요청에 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  useEffect(() => {
    if (Object.keys(Channels).length === 0) getList()
  }, [])

  const updateChannelList = async () => getList()

  return [Channels, updateChannelList]
}

export default useChannelList
