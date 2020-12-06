import React, { useEffect } from 'react'
import { channelInfoAtom } from '../store'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

import request from '../util/request'

const useCurrentChannelInfo = () => {
  const [channelInfo, setChannelInfo] = useRecoilState(channelInfoAtom)

  const history = useHistory()

  const updateChannelInfo = async channelId => {
    try {
      const { data } = await request.GET(
        '/api/channel/' +
          channelId +
          '/info?workspaceUserInfoId=5fc4fe427b2d5f6ae44dc15e',
      )
      if (data.success && data.result.channelId.title !== undefined) {
        setChannelInfo(data.result)
      } else throw '채널 정보 요청 오류'
    } catch (e) {
      toast.error('채널 정보 요청에 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  return [channelInfo, updateChannelInfo]
}

export default useCurrentChannelInfo
