import { useEffect } from 'react'
import { socketRecoil, workspaceRecoil, channelsRecoil } from '../store'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isEmpty } from '../util'
import io from 'socket.io-client'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_CHAT_HOST
    : process.env.REACT_APP_CHAT_HOST

const useSocket = () => {
  const { workspaceId } = useParams()
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)
  const channelList = useRecoilValue(channelsRecoil)
  const [socket, setSocket] = useRecoilState(socketRecoil)

  useEffect(() => {
    if (workspaceId && workspaceUserInfo) {
      setSocket(
        io(`${baseURL}/${workspaceId}`, {
          query: {
            workspaceId,
            workspaceUserInfoId: workspaceUserInfo._id,
          },
        }),
      )
    }
  }, [workspaceId, workspaceUserInfo])

  useEffect(() => {
    if (socket && !isEmpty(channelList))
      socket.emit(
        'join-room',
        channelList.map(channel => channel.channelId._id),
      )
    return () => {
      if (socket)
        socket.emit(
          'leave-room',
          channelList.map(channel => channel.channelId._id),
        )
    }
  }, [socket, channelList])
  return [socket]
}

export default useSocket
