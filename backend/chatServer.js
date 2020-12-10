import { config as dotenv } from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import createChatServer from 'socket.io'
import { createChatMessage } from './service/chat'
dotenv()

const server = createServer(express())
const io = createChatServer(server, {
  cors: { origin: process.env.FRONTEND_HOST, credentials: true },
})

const namespace = io.of('chat')
namespace.use((socket, next) => {
  // TODO jwt 검증 로직 필요
  next()
})

namespace.on('connection', socket => {
  socket.on('new message', async data => {
    // TODO 특정 채널로 전송하도록 변경, db에 저장 필요 (현재는 자신 제외 전체 전송)
    const { channelId, creator } = socket.handshake.query
    const { contents } = data
    const { data: result } = await createChatMessage({
      creator,
      channelId,
      contents,
    })
    namespace.in(channelId).emit('new message', {
      message: { ...data, _id: result._id, createdAt: result.createdAt },
    })
  })
  socket.on('join-room', roomId => {
    socket.join(roomId)
    console.log('joined', roomId)
  })
})

server.listen(process.env.CHAT_PORT, () => {
  console.log('chat server created 4000')
})

export default server
