import { asyncWrapper } from '../../util'
import service from '../../service/file'

exports.getFileURL = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.getFileURL({
    ...req.query,
  })
  return res.status(code).json({ success, data })
})

exports.downloadFile = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.downloadFile({
    ...req.body,
    creator: req.user.id,
  })
  return res.status(code).json({ success, data })
})

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
