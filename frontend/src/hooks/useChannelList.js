import React, { useEffect } from 'react'
import { channelAtom, workspaceUserInfoAtom, workspace } from '../store'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

import request from '../util/request'

const useChannelList = () => {
  const [Channels, setChannels] = useRecoilState(channelAtom)
  const { _id: workspaceUserInfoId } = useRecoilValue(workspace)
  const [workspaceUserInfo, setWorkspaceUserInfo] = useRecoilState(
    workspaceUserInfoAtom,
  )

  const history = useHistory()
  const getList = async () => {
    try {
      if (workspaceUserInfoId) {
        const { data } = await request.GET('/api/channel', {
          workspaceUserInfoId,
        })
        if (data.success) {
          setWorkspaceUserInfo(data.result.userInfo[0])
          setChannels(data.result.channelConfig)
        } else throw '채널 목록 요청 오류'
      }
    } catch (err) {
      toast.error('채널 목록 요청에 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  useEffect(() => {
    if (Object.keys(Channels).length === 0) getList()
  }, [workspaceUserInfoId])

  const updateChannelList = async () => getList()

  return [Channels, updateChannelList]
}

export default useChannelList
