import { config as dotenv } from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import createChatServer from 'socket.io'
import { createChatMessage } from './service/chat'
import { addReaction, removeReaction } from './service/reaction'
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
  socket.on('invite channel', ({ channelId, origin, newMember }) => {
    origin
      .concat(newMember)
      .forEach(member =>
        namespace.in(member).emit('invited channel', { channelId, newMember }),
      )
  })
  socket.on('new message', async data => {
    const { contents, channelId } = data
    const { data: result } = await createChatMessage({
      creator: workspaceUserInfoId,
      channelId,
      contents,
    })
    namespace.in(channelId).emit('new message', {
      message: {
        ...data,
        _id: result._id,
        createdAt: result.createdAt,
        reactions: [],
      },
    })
  })
  socket.on('update reaction', async data => {
    const { emoji, chatId, userInfo, channelId, type } = data
    //1 = add, 0 = remove
    const result =
      type === 1
        ? await addReaction({
            workspaceUserInfoId,
            chatId,
            emoticon: emoji,
          })
        : await removeReaction({
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
        type: result ? type : false,
      },
    })
  })

  socket.on('join-room', (channelList = []) => {
    socket.join(channelList)
  })
  socket.on('leave-room', roomId => {
    socket.leave(roomId)
  })
})

server.listen(process.env.CHAT_PORT, () => {
  console.log('chat server created 4000')
})

export default server
