import { asyncWrapper } from '../../util'
import service from '../../service/channel'

const { WorkspaceUserInfo } = require('../../model/WorkspaceUserInfo')
const { Channel } = require('../../model/Channel')
const { ChannelConfig } = require('../../model/ChannelConfig')
const { Chat } = require('../../model/Chat')

const getChannelList = async (req, res, next) => {
  try {
    const workspaceUserInfoId = req.query.workspaceUserInfoId

    const channelConfig = await ChannelConfig.find(
      {
        workspaceUserInfoId: workspaceUserInfoId,
      },
      {
        _id: 0,
        channelId: 1,
        readChatId: 1,
        isMute: 1,
        notification: 1,
        sectionId: 1,
      },
    ).lean()

    const channel = await Channel.find(
      {
        _id: { $in: channelConfig.map(el => el.channelId) },
      },
      { _id: 1, title: 1, channelType: 1 },
    ).lean()

    const result = channel.map(el => {
      const [currentConfig] = channelConfig.filter(
        val => val.channelId.toString() === el._id.toString(),
      )
      return { ...currentConfig, ...el }
    })

    res.status(200).json({ success: true, result })
  } catch (err) {
    next(err)
  }
}

const getChannelHeaderInfo = async (req, res, next) => {
  try {
    const channelId = req.params.channelId

    const pinned = await Chat.find({ pinned: true, channel: channelId })
    const channelConfig = await ChannelConfig.find({
      channelId: channelId,
    }).lean()
    const workspaceUserInfo = await WorkspaceUserInfo.find({
      _id: { $in: channelConfig.map(el => el.workspaceUserInfoId) },
    }).lean()

    const channel = await Channel.findOne(
      {
        _id: channelId,
      },
      { title: 1, topic: 1, channelType: 1 },
    ).lean()
    const extraData = {
      pinnedCount: pinned.length,
      memberNum: workspaceUserInfo.length,
      member: workspaceUserInfo,
    }

    let result = { ...channel, ...extraData }

    res.status(200).json({ success: true, result })
  } catch (err) {
    next(err)
  }
}

const inviteUser = (req, res, next) => {
  try {
    const workspaceUserInfoId = req.body.workspaceUserInfoId
    const channelId = req.body.channelId

    workspaceUserInfoId.forEach(el => {
      const channelConfig = ChannelConfig({
        workspaceUserInfoId: el,
        channelId,
        isMute: false,
        notification: 0,
        sectionId: null,
      })
      channelConfig.save()
    })

    res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
}

const muteChannel = async (req, res, next) => {
  try {
    const workspaceUserInfoId = req.body.workspaceUserInfoId
    const channelId = req.body.channelId
    const isMute = req.body.isMute

    await ChannelConfig.updateOne(
      {
        workspaceUserInfoId,
        channelId,
      },
      { isMute: isMute },
    )

    res.status(200).json({ success: true })
  } catch (err) {
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

module.exports = {
  getChannelList,
  getChannelHeaderInfo,
  inviteUser,
  muteChannel,
  createChannel
}

