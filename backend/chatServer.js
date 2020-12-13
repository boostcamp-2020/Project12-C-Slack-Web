import { config as dotenv } from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import createChatServer from 'socket.io'
import { createChatMessage } from './service/chat'
import { updateReaction } from './service/reaction'
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
  socket.on('invite channel', invitedMember => {
    namespace.in(invitedMember).emit('invited channel')
  })
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
  socket.on('update reaction', async data => {
    const { emoji, chatId, userInfo, channelId } = data
    //1 = add, 0 = remove
    const result = await updateReaction({
      workspaceUserInfoId,
      chatId,
      emoticon: emoji,
    })

    namespace.in(channelId).emit('update reaction', {
      reaction: {
        chatId: chatId,
        emoji: emoji,
        workspaceUserInfoId: userInfo._id,
        displayName: userInfo.displayName,
        type: result ? 1 : 0,
      },
    })
  })

  socket.on('join-room', (channelList = []) => {
    socket.join(channelList)
    console.log('joined', channelList)
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
