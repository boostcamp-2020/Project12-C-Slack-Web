import { Chat } from '../model/Chat'
import statusCode from '../util/statusCode'
import { verifyRequiredParams, dbErrorHandler } from '../util'

const getChatMessages = async ({ channelId, currentCursor, fromDate }) => {
  verifyRequiredParams(channelId)
  const result = await dbErrorHandler(() =>
    Chat.getChatMessages({ channelId, currentCursor, fromDate }),
  )
  return {
    code: statusCode.OK,
    data: result,
    success: true,
  }
}
const createChatMessage = async ({ channelId, creator, contents, file }) => {
  verifyRequiredParams(channelId, creator, contents || file)
  const result = await dbErrorHandler(() =>
    Chat.create({
      channel: channelId,
      creator,
      contents,
      file: file === null ? undefined : file,
    }),
  )
  return { data: result }
}
const createReplyMessage = async ({
  channelId,
  creator,
  contents,
  parentId,
  file,
}) => {
  verifyRequiredParams(channelId, creator, contents, parentId)
  const result = await dbErrorHandler(() =>
    Chat.create({
      channel: channelId,
      parentId: parentId,
      creator,
      contents,
      file: file === null ? undefined : file,
    }),
  )
  return { data: result }
}

const getReplyMessage = async ({ channelId, parentId }) => {
  verifyRequiredParams(channelId, parentId)
  const result = await dbErrorHandler(() =>
    Chat.getReplyMessages({ channelId, parentId }),
  )
  return { code: statusCode.OK, data: result, success: true }
}

module.exports = {
  getChatMessages,
  createChatMessage,
  getReplyMessage,
  createReplyMessage,
}
