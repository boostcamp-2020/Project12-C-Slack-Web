import { Chat } from '../model/Chat'
import statusCode from '../util/statusCode'
import { verifyRequiredParams, dbErrorHandler } from '../util'

const getChatMessages = async ({ channelId, currentCursor, fromDate }) => {
  verifyRequiredParams(channelId)
  const filter = {}
  if (currentCursor)
    filter.createdAt = { $lt: `${new Date(currentCursor).toISOString()}` }
  if (fromDate)
    filter.createdAt = { $gt: `${new Date(fromDate).toISOString()}` }
  const result = await dbErrorHandler(() =>
    Chat.getChatMessages({ channelId, currentCursor, fromDate }),
  )
  return {
    code: statusCode.OK,
    data: result,
    success: true,
  }
}
const createChatMessage = async ({ channelId, creator, contents }) => {
  verifyRequiredParams(channelId, creator, contents)
  const result = await dbErrorHandler(() =>
    Chat.create({ channel: channelId, creator, contents }),
  )
  return { data: result }
}
module.exports = { getChatMessages, createChatMessage }
