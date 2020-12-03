import { Chat } from '../model/Chat'
import statusCode from '../util/statusCode'
import { verifyRequiredParams, dbErrorHandler } from '../util'

const getChatMessages = async ({ channelId, page, fromDate }) => {
  verifyRequiredParams(channelId)
  const filter = {}
  if (page) filter.createdAt = { $lt: new Date(page) }
  if (fromDate) filter.createdAt = { $gt: new Date(fromDate) }
  const result = await dbErrorHandler(() =>
    Chat.getChatMessages({ channelId, filter }),
  )

  return {
    code: statusCode.OK,
    data: result,
    success: true,
  }
}

module.exports = { getChatMessages }
