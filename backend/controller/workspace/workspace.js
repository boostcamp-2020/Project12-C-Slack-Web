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
  console.log('req.user: ', req.user)
  return res.status(200).json()
}
