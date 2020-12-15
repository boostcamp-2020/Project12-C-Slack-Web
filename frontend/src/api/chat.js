import Request from '../util/request'
export const getChatMessage = async ({
  workspaceId,
  channelId,
  currentCursor,
}) => {
  const { data } = await Request.GET(`/api/chat/${workspaceId}/${channelId}`, {
    currentCursor,
  })
  return data.data.reverse()
}

export const getChatReplyMessage = async ({
  workspaceId,
  channelId,
  chatId,
}) => {
  const data = await Request.GET(
    `/api/chat/${workspaceId}/${channelId}/reply`,
    {
      parentId: chatId,
    },
  )
  return data ? data.data.data.reverse() : [false]
}
