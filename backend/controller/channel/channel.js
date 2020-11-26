import { asyncWrapper } from '../../util'
import service from '../../service/channel'

const createChannel = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.createChannel({
    ...req.body,
    creator: req.user,
  })
  return res.status(code).json({ success, data })
})

module.exports = { createChannel }
