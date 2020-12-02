import { asyncWrapper } from '../../util'
import service from '../../service/channel'
import resMessage from '../../util/resMessage'
import statusCode from '../../util/statusCode'
import { WorkspaceUserInfo } from '../../model/WorkspaceUserInfo'
import { ChannelConfig } from '../../model/ChannelConfig'

const getChannelList = async (req, res, next) => {
  const workspaceUserInfoId = req.query.workspaceUserInfoId
  const { code, success, result } = await service.getChannelListDB({
    workspaceUserInfoId,
  })
  return res.status(code).json({ success, result })
}

const getChannelHeaderInfo = async (req, res, next) => {
  try {
    const channelId = req.params.channelId
    const workspaceUserInfoId = req.query.workspaceUserInfoId
    const { code, success, result } = await service.getChannelHeaderInfoDB({
      channelId,
      workspaceUserInfoId,
    })
    return res.status(code).json({ success, result })
  } catch (err) {
    next(err)
  }
}

const inviteUser = async (req, res, next) => {
  try {
    const workspaceUserInfoId = req.body.workspaceUserInfoId
    const channelId = req.body.channelId
    const { code, success } = await service.inviteUserDB({
      channelId,
      workspaceUserInfoId,
    })
    return res.status(code).json({ success })
  } catch (err) {
    next(err)
  }
}

const muteChannel = async (req, res, next) => {
  try {
    const { isMute, channelId, workspaceUserInfoId } = req.body
    const { code, success } = await service.muteChannelDB({
      channelId,
      workspaceUserInfoId,
      isMute,
    })
    return res.status(code).json({ success })
  } catch (err) {
    next(err)
  }
}

const updateChannelSection = async (req, res, next) => {
  try {
    const { sectionName, channelId, workspaceUserInfoId } = req.body

    const { code, success } = await service.updateChannelSectionDB({
      channelId,
      workspaceUserInfoId,
      sectionName,
    })
    return res.status(code).json({ success })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const createChannel = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.createChannel({
    ...req.body,
    creator: req.user,
  })
  return res.status(code).json({ success, data })
})

const checkDuplicate = asyncWrapper(async (req, res) => {
  const { code, success, data } = await service.checkDuplicate({
    title: req.query.title,
    workspaceId: req.query.workspaceId,
  })
  return res.status(code).json({ success, data })
})

module.exports = {
  getChannelList,
  getChannelHeaderInfo,
  inviteUser,
  muteChannel,
  updateChannelSection,
  createChannel,
  checkDuplicate,
}
