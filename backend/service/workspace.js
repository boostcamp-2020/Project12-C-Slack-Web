import { Workspace } from '../model/Workspace'
import { User } from '../model/User'
import { WorkspaceUserInfo } from '../model/WorkspaceUserInfo'
import statusCode from '../util/statusCode'
import resMessage from '../util/resMessage'
import { verifyRequiredParams, dbErrorHandler } from '../util/'
import { encrypt, decrypt } from '../util/encryption'
import { Channel } from '../model/Channel'
import { ChannelConfig } from '../model/ChannelConfig'
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const createWorkspace = async params => {
  verifyRequiredParams(params.creator, params.name, params.channelName)
  const findedWorkspaceData = await dbErrorHandler(() =>
    Workspace.findOne({ name: params.name }),
  )
  const findedUser = await dbErrorHandler(() =>
    User.findOne({ _id: params.creator }),
  )
  if (findedWorkspaceData) {
    throw {
      status: statusCode.BAD_REQUEST,
      message: resMessage.ALREADY_X('이름'),
    }
  }
  const workspaceData = await dbErrorHandler(() => Workspace.create(params))
  const workspaceUserInfoData = await dbErrorHandler(() =>
    WorkspaceUserInfo.create({
      userId: params.creator,
      workspaceId: workspaceData._id,
      title: findedUser.fullName,
      fullName: findedUser.fullName,
      displayName: findedUser.fullName,
      profileUrl: findedUser.profileUrl,
      isActive: false,
    }),
  )
  const channelData = await dbErrorHandler(() =>
    Channel.create({
      creator: workspaceUserInfoData._id,
      title: params.channelName,
      workspaceId: workspaceData._id,
      channelType: 1,
    }),
  )
  await dbErrorHandler(() =>
    ChannelConfig.create({
      channelId: ObjectId(channelData._id),
      workspaceUserInfoId: ObjectId(channelData.creator),
    }),
  )
  await dbErrorHandler(() =>
    Workspace.updateOne(
      { _id: ObjectId(workspaceData._id) },
      { default_channel: ObjectId(channelData._id) },
    ),
  )
  return {
    code: statusCode.CREATED,
    data: {
      inviteCode: invite({ workspaceId: workspaceData._id }),
      workspaceId: workspaceData._id,
      channelId: channelData._id,
    },
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
      WorkspaceUserInfo.findOne({ workspaceId, userId }),
    )
    const findedUser = await dbErrorHandler(() => User.findOne({ _id: userId }))
    if (!workspaceUserData) {
      const createdWorkspaceUserData = await dbErrorHandler(() =>
        WorkspaceUserInfo.create({
          userId,
          workspaceId,
          title: findedUser?.fullName,
          fullName: findedUser?.fullName,
          displayName: findedUser?.fullName,
          profileUrl: findedUser?.profileUrl,
          isActive: false,
        }),
      )
      const workspaceData = await dbErrorHandler(() =>
        Workspace.findOne({ _id: ObjectId(workspaceId) }),
      )
      await dbErrorHandler(() =>
        ChannelConfig.create({
          channelId: ObjectId(workspaceData.default_channel),
          workspaceUserInfoId: ObjectId(createdWorkspaceUserData._id),
        }),
      )

      return {
        code: statusCode.CREATED,
        data: { workspaceId, default_channel: workspaceData.default_channel },
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

const checkDuplicateName = async ({ name }) => {
  verifyRequiredParams(name)
  const result = await dbErrorHandler(() => Workspace.findOne({ name: name }))
  return {
    code: statusCode.OK,
    data: result ? true : false,
    success: true,
  }
}

const getWorkspaceUserInfo = async ({ userId, workspaceId }) => {
  verifyRequiredParams(userId, workspaceId)
  const [workspaceUserInfo, workspaceInfo] = await Promise.all([
    dbErrorHandler(() =>
      WorkspaceUserInfo.findOne({
        workspaceId,
        userId,
      }).lean(),
    ),
    dbErrorHandler(() => Workspace.findOne({ _id: workspaceId }).lean()),
  ])
  workspaceUserInfo.workspaceInfo = workspaceInfo
  return {
    code: statusCode.OK,
    data: workspaceUserInfo,
    success: true,
  }
}

const getWorkspaceUserInfoByInfoId = async ({ workspaceUserInfoId }) => {
  const workspaceUserInfoData = await dbErrorHandler(() =>
    WorkspaceUserInfo.getWorkspaceUserInfo(workspaceUserInfoId),
  )
  return {
    code: statusCode.OK,
    data: workspaceUserInfoData[0],
    success: true,
  }
}

module.exports = {
  createWorkspace,
  getWorkspaces,
  invite,
  invited,
  checkDuplicateName,
  getWorkspaceUserInfo,
  getWorkspaceUserInfoByInfoId,
}
