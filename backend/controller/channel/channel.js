import { asyncWrapper } from '../../util'
import service from '../../service/channel'

const getChannelList = asyncWrapper(async (req, res) => {
  const workspaceUserInfoId = req.query.workspaceUserInfoId
  const { code, success, result } = await service.getChannelListDB({
    workspaceUserInfoId,
  })
  return res.status(code).json({ success, result })
})

const getChannelBrowserData = asyncWrapper(async (req, res) => {
  const { workspaceUserInfoId, workspaceId } = req.query
  const { code, success, result } = await service.getChannelBrowserData({
    workspaceUserInfoId,
    workspaceId,
  })
  return res.status(code).json({ success, result })
})

const getChannelHeaderInfo = asyncWrapper(async (req, res) => {
  const channelId = req.params.channelId
  const workspaceUserInfoId = req.query.workspaceUserInfoId
  const { code, success, result } = await service.getChannelHeaderInfoDB({
    channelId,
    workspaceUserInfoId,
  })
  return res.status(code).json({ success, result })
})

const inviteUser = asyncWrapper(async (req, res) => {
  const workspaceUserInfoId = req.body.workspaceUserInfoId
  const channelId = req.body.channelId
  const { code, success } = await service.inviteUserDB({
    channelId,
    workspaceUserInfoId,
  })
  return res.status(code).json({ success })
})

const muteChannel = asyncWrapper(async (req, res) => {
  const { isMute, channelId, workspaceUserInfoId } = req.body
  const { code, success } = await service.muteChannelDB({
    channelId,
    workspaceUserInfoId,
    isMute,
  })
  return res.status(code).json({ success })
})

const updateChannelSection = asyncWrapper(async (req, res) => {
  const { sectionName, channelId, workspaceUserInfoId } = req.body

  const { code, success } = await service.updateChannelSectionDB({
    channelId,
    workspaceUserInfoId,
    sectionName,
  })
  return res.status(code).json({ success })
})

const createChannel = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.createChannel({
    ...req.body,
  })
  return res.status(code).json({ success, data })
})

const leaveChannel = asyncWrapper(async (req, res) => {
  const { code, success } = await service.leaveChannel({
    ...req.body,
  })
  return res.status(code).json({ success })
})

const joinChannel = asyncWrapper(async (req, res) => {
  const { code, success } = await service.joinChannel({
    ...req.body,
  })
  return res.status(code).json({ success })
})

const checkDuplicate = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.checkDuplicate({
    title: req.query.title,
    workspaceId: req.query.workspaceId,
  })
  return res.status(code).json({ success, data })
})

const findChannelIdByName = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.findChannelIdByName({
    ...req.query,
  })
  return res.status(code).json({ success, data })
})

module.exports = {
  getChannelList,
  getChannelBrowserData,
  getChannelHeaderInfo,
  inviteUser,
  muteChannel,
  updateChannelSection,
  createChannel,
  checkDuplicate,
  leaveChannel,
  joinChannel,
  findChannelIdByName,
}
