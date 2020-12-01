import { Channel } from '../model/Channel'
import { WorkspaceUserInfo } from '../model/WorkspaceUserInfo'
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

module.exports = { createChannel, checkDuplicate }
