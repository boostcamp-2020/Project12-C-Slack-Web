import { Channel } from '../model/Channel'
import { WorkspaceUserInfo } from '../model/WorkspaceUserInfo'
import { ChannelConfig } from '../model/ChannelConfig'
import statusCode from '../util/statusCode'
import resMessage from '../util/resMessage'
import { verifyRequiredParams, dbErrorHandler } from '../util'

const createChannel = async params => {
  verifyRequiredParams(params.creator, params.title, params.channelType)
  const { data } = await checkDuplicate(params)
  if (!data)
    throw {
      status: statusCode.BAD_REQUEST,
      message: resMessage.DUPLICATE_VALUE_ERROR,
    }
  const result = await dbErrorHandler(() => Channel.create(params))
  return {
    code: statusCode.CREATED,
    data: result,
    success: true,
  }
}

const checkDuplicate = async ({ title, workspaceId }) => {
  verifyRequiredParams(title, workspaceId)
  const result = await Promise.all([
    dbErrorHandler(() => Channel.findOne({ title })),
    dbErrorHandler(() =>
      WorkspaceUserInfo.findOne({ workspaceId, displayName: title }),
    ),
  ])
  return {
    code: statusCode.OK,
    data: result.every(v => v === null),
    success: true,
  }
}

const getChannelListDB = async ({ workspaceUserInfoId }) => {
  verifyRequiredParams(workspaceUserInfoId)
  const [userInfo, channelConfig] = await Promise.all([
    dbErrorHandler(() =>
      WorkspaceUserInfo.find(
        {
          _id: workspaceUserInfoId,
        },
        { _id: 1, displayName: 1, profileUrl: 1, isActive: 1, sections: 1 },
      ).lean(),
    ),
    dbErrorHandler(() => ChannelConfig.getChannelList(workspaceUserInfoId)),
  ])

  return {
    code: statusCode.OK,
    result: { channelConfig, userInfo },
    success: true,
  }
}

const getChannelHeaderInfoDB = async ({ channelId, workspaceUserInfoId }) => {
  verifyRequiredParams(channelId, workspaceUserInfoId)

  const [result] = await dbErrorHandler(() =>
    ChannelConfig.getChannelHeaderInfo(channelId, workspaceUserInfoId),
  )

  return {
    code: statusCode.OK,
    result,
    success: true,
  }
}

const inviteUserDB = async ({ channelId, workspaceUserInfoId }) => {
  verifyRequiredParams(channelId, workspaceUserInfoId)
  await Promise.all([
    workspaceUserInfoId.forEach(el => {
      dbErrorHandler(() => {
        const channelConfig = ChannelConfig({
          workspaceUserInfoId: el,
          channelId,
          isMute: false,
          notification: 0,
          sectionId: null,
        })
        channelConfig.save()
      })
    }),
  ])

  return {
    code: statusCode.OK,
    success: true,
  }
}

const muteChannelDB = async ({ channelId, workspaceUserInfoId, isMute }) => {
  verifyRequiredParams(channelId, workspaceUserInfoId, isMute)
  await dbErrorHandler(() =>
    ChannelConfig.updateOne(
      {
        workspaceUserInfoId,
        channelId,
      },
      { isMute: isMute },
    ),
  )

  return {
    code: statusCode.OK,
    success: true,
  }
}

const updateChannelSectionDB = async ({
  channelId,
  workspaceUserInfoId,
  sectionName,
}) => {
  verifyRequiredParams(channelId, workspaceUserInfoId)
  await dbErrorHandler(() =>
    ChannelConfig.updateOne(
      {
        workspaceUserInfoId,
        channelId,
      },
      { sectionName: sectionName },
    ),
  )

  return {
    code: statusCode.OK,
    success: true,
  }
}

module.exports = {
  createChannel,
  checkDuplicate,
  getChannelListDB,
  getChannelHeaderInfoDB,
  inviteUserDB,
  muteChannelDB,
  updateChannelSectionDB,
}
