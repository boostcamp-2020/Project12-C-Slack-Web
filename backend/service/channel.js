import { Channel } from '../model/Channel'
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

module.exports = { createChannel }
