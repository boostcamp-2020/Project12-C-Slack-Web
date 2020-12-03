import { Chat } from '../model/Chat'
import { WorkspaceUserInfo } from '../model/WorkspaceUserInfo'
import statusCode from '../util/statusCode'
import resMessage from '../util/resMessage'
import {
  verifyRequiredParams,
  dbErrorHandler,
  desiredKeyConverter,
} from '../util'
import { MAX_CHAT_MESSAGE } from '../util/constant'
// 프로필 이미지, 이름, 전송시간, 내용,
// reply 갯수를 포함하며 특정 날짜의 메시지를 가져올 수 있다.
// creator를 통해 프로필 이미지, 이름
// chat으로 전송 시간, 내용, reply 개수 카운트, reply 작성자 profile image
// 댓글 작성자 id, profile image, 댓글 작성 시간
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
