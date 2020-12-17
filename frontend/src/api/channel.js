import Request from '../util/request'
export const checkDuplicateChannelName = async ({ title, workspaceId }) => {
  const { data } = await Request.GET('/api/channel/check-duplicate-name', {
    title,
    workspaceId,
  })
  return data?.data
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
  if (
    channelId === 'threads' ||
    channelId === 'all-dms' ||
    channelId === 'saved-page' ||
    channelId === 'activity-page' ||
    channelId === 'more'
  )
    return null
  const { data } = await Request.GET(`/api/channel/${channelId}/info`, {
    workspaceUserInfoId,
  })
  return data.result
}

export const getChannelBrowserData = async ({
  workspaceUserInfoId,
  workspaceId,
}) => {
  const { data } = await Request.GET('/api/channel/browser', {
    workspaceUserInfoId,
    workspaceId,
  })
  return data.result
}

export const leaveChannel = async ({ workspaceUserInfoId, channelId }) => {
  const result = await Request.POST('/api/channel/leave', {
    workspaceUserInfoId,
    channelId,
  })
  return result
}

export const joinChannel = async ({ workspaceUserInfoId, channelId }) => {
  const result = await Request.POST('/api/channel/join', {
    workspaceUserInfoId,
    channelId,
  })
  return result
}

export const findChannelIdByName = async ({ title }) => {
  const { data } = await Request.GET(`/api/channel/info?title=${title}`)
  return data?.data
}
