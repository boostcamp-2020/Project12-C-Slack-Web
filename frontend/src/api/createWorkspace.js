import Request from '../util/request'

export const checkDuplicateWorkspaceName = async ({ name }) => {
  const { data } = await Request.GET('/api/workspace/check-duplicate-name', {
    name,
  })
  return data
}
