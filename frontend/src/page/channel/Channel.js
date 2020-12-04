import React from 'react'
import MessageEditor from '../../organism/messageEditor/MessageEditor'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import CreateChannelModal from '../../organism/CreateChannelModal'
const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_CHAT_HOST
    : process.env.REACT_APP_CHAT_HOST

const socket = io(baseURL, {
  query: { username: 'test1' },
})

function Channel() {
  const [messages, setMessages] = useState([])
  // TODO message 전송 template, 추후 구현
  const sendMessage = message => socket.emit('new message', message)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })

    socket.on('new message', data => {
      setMessages(...messages, data)
    })

    socket.emit('add user', 'username')
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('new message')
    }
  }, [])
  return (
    <div>
      {/* TODO messgae component channel header component 추가 필요 */}
      <MessageEditor channelTitle={'hello world'} sendMessage={sendMessage} />
      <CreateChannelModal />
    </div>
  )
}

export default Channel
