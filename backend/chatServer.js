import { config as dotenv } from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import createChatServer from 'socket.io'
import { createChatMessage, createReplyMessage } from './service/chat'
import { addReaction, removeReaction } from './service/reaction'
import { SOCKET_EVENT } from './util/constant'
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
  socket.on(SOCKET_EVENT.INVITE_CHANNEL, ({ channelId, origin, newMember }) => {
    origin
      .concat(newMember)
      .forEach(member =>
        namespace
          .in(member)
          .emit(SOCKET_EVENT.INVITED_CHANNEL, { channelId, newMember }),
      )
  })
  socket.on(SOCKET_EVENT.NEW_MESSAGE, async data => {
    const { contents, channelId, file } = data
    const { data: result } = await createChatMessage({
      creator: workspaceUserInfoId,
      channelId,
      contents,
      file,
    })
    namespace.in(channelId).emit(SOCKET_EVENT.NEW_MESSAGE, {
      message: {
        ...data,
        _id: result._id,
        createdAt: result.createdAt,
        reactions: [],
        reply: [],
      },
    })
  })
  socket.on(SOCKET_EVENT.NEW_REPLY, async data => {
    const { contents, channelId, parentId, file } = data
    const { data: result } = await createReplyMessage({
      creator: workspaceUserInfoId,
      channelId,
      contents,
      parentId,
      file,
    })
    namespace.in(channelId).emit(SOCKET_EVENT.NEW_REPLY, {
      message: {
        ...data,
        _id: result._id,
        createdAt: result.createdAt,
        chatId: parentId,
        reactions: [],
      },
    })
  })
  socket.on(SOCKET_EVENT.UPDAETE_REACTION, async data => {
    const { emoji, chatId, userInfo, channelId, type, parentId } = data
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

    namespace.in(channelId).emit(SOCKET_EVENT.UPDAETE_REACTION, {
      reaction: {
        chatId: chatId,
        emoji: emoji,
        workspaceUserInfoId: userInfo._id,
        displayName: userInfo.displayName,
        type: result ? type : false,
        parentId: parentId,
      },
    })
  })

  socket.on(SOCKET_EVENT.JOIN_ROOM, (channelList = []) => {
    socket.join(channelList)
  })
  socket.on(SOCKET_EVENT.LEAVE_ROOM, roomId => {
    socket.leave(roomId)
  })
})

server.listen(process.env.CHAT_PORT, () => {
  console.log('chat server created 4000')
})

export default server
