import Request from '../util/request'
export const checkDuplicateChannelName = async ({ title, workspaceId }) => {
  const { data } = await Request.GET('/api/channel/check-duplicate-name', {
    title,
    workspaceId,
  })
  return data.data
}

export const createChannel = async params => {
  const { data } = await Request.POST('/api/channel', {
    ...params,
  })
  return data?.data?._id
}
