import { asyncWrapper } from '../../util'
import service from '../../service/chat'

const getChat = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.getChatMessages({
    ...req.query,
    ...req.params,
  })
  return res.status(code).json({ success, data })
})

module.exports = {
  getChat,
}
