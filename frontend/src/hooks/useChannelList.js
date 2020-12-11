import React, { useEffect } from 'react'
import { channelsRecoil, workspaceRecoil } from '../store'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

import request from '../util/request'

const useChannelList = () => {
  const [Channels, setChannels] = useRecoilState(channelsRecoil)
  const workspaceUserInfoId = useRecoilValue(workspaceRecoil)

  const history = useHistory()
  const getList = async () => {
    try {
      if (workspaceUserInfoId !== null) {
        const { data } = await request.GET('/api/channel', {
          workspaceUserInfoId: workspaceUserInfoId._id,
        })
        if (data.success) setChannels(data.result)
        else throw '채널 목록 요청 오류'
      }
    } catch (err) {
      toast.error('채널 목록 요청에 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  useEffect(() => {
    getList()
  }, [workspaceUserInfoId])

  const updateChannelList = async () => getList()

  return [Channels, updateChannelList]
}

export default useChannelList
