import { Channel } from '../model/Channel'
import { WorkspaceUserInfo } from '../model/WorkspaceUserInfo'
import statusCode from '../util/statusCode'
import { verifyRequiredParams, dbErrorHandler } from '../util'

const createChannel = async params => {
  verifyRequiredParams(params.creator, params.title, params.channelType)

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

module.exports = { createChannel, checkDuplicate }
