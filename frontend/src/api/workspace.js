import Request from '../util/request'
export const getWorkspaceUserInfo = async ({ workspaceId }) => {
  const { data } = await Request.GET(`/api/workspace/info/${workspaceId}`)
  return data.data
}

export const getWorkspaceUserInfoByInfoId = async ({ workspaceUserInfoId }) => {
  const { data } = await Request.GET(
    `/api/workspace/info?workspaceUserInfoId=${workspaceUserInfoId}`,
  )
  return data.data
}

export const inviteWorkspace = async ({ workspaceId }) => {
  const { data } = await Request.POST('/api/workspace/invite', {
    workspaceId: workspaceId,
  })
  return data.data
}
