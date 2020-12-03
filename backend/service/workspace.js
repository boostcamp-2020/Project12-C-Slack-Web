import { Workspace } from '../model/Workspace'
import { WorkspaceUserInfo } from '../model/WorkspaceUserInfo'
import statusCode from '../util/statusCode'
import resMessage from '../util/resMessage'
import { verifyRequiredParams, dbErrorHandler } from '../util/'
import { encrypt, decrypt } from '../util/encryption'

const createWorkspace = async params => {
  verifyRequiredParams(params.creator, params.name, params.channelName)
  const findedWorkspaceData = await dbErrorHandler(() =>
    Workspace.findOne({ name: params.name }),
  )
  if (findedWorkspaceData) {
    throw {
      status: statusCode.BAD_REQUEST,
      message: resMessage.ALREADY_X('이름'),
    }
  }
  const workspaceData = await dbErrorHandler(() => Workspace.create(params))
  await dbErrorHandler(() =>
    WorkspaceUserInfo.create({
      userId: params.creator,
      workspaceId: workspaceData._id,
    }),
  )
  return {
    code: statusCode.CREATED,
    data: invite({ workspaceId: workspaceData._id }),
    success: true,
  }
}

const getWorkspaces = async ({ userId }) => {
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

const invite = ({ workspaceId }) => {
  const data = workspaceId + ':' + new Date().getTime()
  const encryptData = encrypt(data)
  verifyRequiredParams(workspaceId)
  return {
    code: statusCode.CREATED,
    data: encryptData,
    success: true,
  }
}

const invited = async ({ userId, code }) => {
  verifyRequiredParams(code)
  const data = decrypt(code)
  const [workspaceId, date] = data.split(':')
  let startTime = new Date(date * 1000)
  const deltaTime = new Date().getTime() - startTime.getTime() / 1000
  const deltaMinute = deltaTime / 1000 / 60

  if (deltaMinute < 60) {
    const workspaceUserData = await dbErrorHandler(() =>
      WorkspaceUserInfo.findOne({
        workspaceId,
        userId,
      }),
    )
    if (!workspaceUserData) {
      const createdWorkspaceUserData = await dbErrorHandler(() =>
        WorkspaceUserInfo.create({ userId, workspaceId }),
      )
      return {
        code: statusCode.CREATED,
        data: createdWorkspaceUserData,
        success: true,
      }
    } else {
      return {
        code: statusCode.NOT_MODIFIED,
        success: false,
      }
    }
  } else {
    throw { status: statusCode.UNAUTHORIZED, message: resMessage.OUT_OF_VALUE }
  }
}

module.exports = { createWorkspace, getWorkspaces, invite, invited }