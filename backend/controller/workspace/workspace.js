import { asyncWrapper } from '../../util'
import service from '../../service/workspace'

exports.createWorkspace = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.createWorkspace({
    ...req.body,
    creator: req.user.id,
  })
  return res.status(code).json({ success, data })
})

exports.getWorkspaces = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.getWorkspaces({
    ...req.body,
    userId: req.user.id,
  })
  return res.status(code).json({ success, data })
})

exports.invite = (req, res) => {
  const { code, success, data } = service.invite({
    ...req.body,
  })
  return res.status(code).json({ success, data })
}

exports.invited = asyncWrapper(async (req, res) => {
  const { success, data } = await service.invited({
    ...req.params,
    userId: req.user.id,
  })
  if (success) {
    const workspaceRedirectURL = `${process.env.FRONTEND_HOST}/workspace/${data.workspaceId}/${data.default_channel}`
    return res.redirect(workspaceRedirectURL)
  }
  return res.redirect(process.env.FRONTEND_HOST)
})

exports.checkDuplicateName = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.checkDuplicateName({
    ...req.query,
  })
  return res.status(code).json({ success, data })
})

exports.getWorkspaceUserInfo = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.getWorkspaceUserInfo({
    ...req.params,
    userId: req.user.id,
  })
  return res.status(code).json({ success, data })
})

exports.getWorkspaceUserInfoByInfoId = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.getWorkspaceUserInfoByInfoId({
    ...req.query,
  })
  return res.status(code).json({ success, data })
})
