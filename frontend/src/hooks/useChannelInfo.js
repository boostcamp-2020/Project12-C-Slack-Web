import { useEffect } from 'react'
import { currentChannelInfoRecoil, workspaceRecoil } from '../store'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getChannelHeaderInfo } from '../api/channel'

const useChannelInfo = () => {
  const { channelId } = useParams()
  const [channelInfo, setChannelInfo] = useRecoilState(currentChannelInfoRecoil)
  const workspaceInfo = useRecoilValue(workspaceRecoil)
  const updateChannelInfo = async channelId => {
    if (workspaceInfo) {
      setChannelInfo(
        await getChannelHeaderInfo({
          workspaceUserInfoId: workspaceInfo._id,
          channelId,
        }),
      )
    }
  }

  useEffect(() => {
    updateChannelInfo(channelId)
  }, [channelId, workspaceInfo])

  return [channelInfo, updateChannelInfo]
}

export default useChannelInfo
