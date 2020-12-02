import { asyncWrapper } from '../../util'
import service from '../../service/workspace'

exports.createWorkspace = asyncWrapper(async (req, res, next) => {
  const { code, success, data } = await service.createWorkspace({
    ...req.body,
    creator: req.user.id,
  })
  return res.status(code).json({ success, data })
})

exports.getWorkspaces = asyncWrapper(async (req, res, next) => {
  const { code, success, data } = await service.getWorkspaces({
    ...req.body,
    userId: req.user.id,
  })
  return res.status(code).json({ success, data })
})

exports.invite = (req, res, next) => {
  const { code, success, data } = service.invite({
    ...req.body,
  })
  return res.status(code).json({ success, data })
}

exports.invited = asyncWrapper(async (req, res, next) => {
  const { code, success, data } = await service.invited({
    ...req.params,
    userId: req.user.id,
  })
  return res.status(code).json({ success, data })
})
