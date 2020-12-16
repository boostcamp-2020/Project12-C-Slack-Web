import { asyncWrapper } from '../../util'
import service from '../../service/file'

exports.uploadFile = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.uploadFile({
    file: req.file,
    userId: req.user.id,
  })
  return res.status(code).json({ success, data })
})

exports.deleteFile = asyncWrapper(async (req, res) => {
  const { code, success } = await service.deleteFile({
    ...req.query,
  })
  return res.status(code).json({ success })
})
