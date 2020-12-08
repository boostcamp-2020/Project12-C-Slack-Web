import Request from '../util/request'
export const getChatMessage = async ({
  workspaceId,
  channelId,
  currentCursor,
}) => {
  const { data } = await Request.GET(`/api/chat/${workspaceId}/${channelId}`, {
    currentCursor,
  })
  return data.data
}
