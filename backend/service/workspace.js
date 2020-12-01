import { Workspace } from '../model/Workspace'
import { WorkspaceUserInfo } from '../model/WorkspaceUserInfo'
import statusCode from '../util/statusCode'
import { verifyRequiredParams, dbErrorHandler } from '../util'

exports.createWorkspace = async params => {
  verifyRequiredParams(params.creator, params.name, params.channelName)

  const workspaceData = await dbErrorHandler(() => Workspace.create(params))
  const workspaceUserData = await dbErrorHandler(() =>
    WorkspaceUserInfo.create({
      userId: params.creator,
      workspaceId: workspaceData._id,
    }),
  )
  return {
    code: statusCode.CREATED,
    data: { workspace: workspaceData, workspaceUser: workspaceUserData },
    success: true,
  }
}

exports.getWorkspaces = async ({ userId }) => {
  verifyRequiredParams(userId)

  const userInformations = await dbErrorHandler(() =>
    WorkspaceUserInfo.find({ userId }, { workspaceId: 1 }),
  ).lean()
  const workspaceIds = userInformations.map(item => {
    return item.workspaceId
  })
  const workspaceDatas = await dbErrorHandler(() =>
    Workspace.find({ _id: { $in: workspaceIds } }),
  ).lean()

  return {
    code: statusCode.CREATED,
    data: workspaceDatas,
    success: true,
  }
}
