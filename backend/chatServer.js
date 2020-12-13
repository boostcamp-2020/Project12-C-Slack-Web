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

const namespace = io.of(/^\/chat\/\w+$/)
namespace.use((socket, next) => {
  // TODO jwt 검증 로직 필요
  next()
})

namespace.on('connection', socket => {
  const { workspaceUserInfoId } = socket.handshake.query
  socket.join(workspaceUserInfoId)
  socket.on('new message', async data => {
    const { contents, channelId } = data
    const { data: result } = await createChatMessage({
      creator: workspaceUserInfoId,
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
  socket.on('leave-room', roomId => {
    socket.leave(roomId)
    console.log('leaved', roomId)
  })
})

server.listen(process.env.CHAT_PORT, () => {
  console.log('chat server created 4000')
})

export default server
