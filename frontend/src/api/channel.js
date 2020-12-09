import Request from '../util/request'
export const checkDuplicateChannelName = async ({ title, workspaceId }) => {
  const { data } = await Request.GET('/api/channel/check-duplicate-name', {
    title,
    workspaceId,
  })
  return data
}

export const createChannel = async params => {
  const { data } = await Request.POST('/api/channel', {
    ...params,
  })
  return data?.data?._id
}

export const getChannelHeaderInfo = async ({
  channelId,
  workspaceUserInfoId,
}) => {
  const { data } = await Request.GET(`/api/channel/${channelId}/info`, {
    workspaceUserInfoId,
  })
  return data.result
}
