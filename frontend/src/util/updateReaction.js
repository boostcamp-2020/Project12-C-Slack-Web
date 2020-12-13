function updateReaction({
  workspaceUserInfo,
  socket,
  emoji,
  chatId,
  channelId,
}) {
  const reaction = {
    emoji: emoji,
    chatId: chatId,
    channelId: channelId,
    userInfo: {
      _id: workspaceUserInfo._id,
      displayName: workspaceUserInfo.displayName,
    },
  }
  socket.emit('update reaction', reaction)
}

export default updateReaction
