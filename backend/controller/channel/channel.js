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
    )
      .sort({ channelType: -1 })
      .lean()

    const directMessage = await ChannelConfig.find(
      {
        channelId: {
          $in: channel
            .filter(el => {
              if (el.channelType === 2) return true
              return false
            })
            .map(el => el._id),
        },
      },
      { _id: 1, workspaceUserInfoId: 1, channelId: 1 },
    ).lean()

    const directMessageMemberInfo = await WorkspaceUserInfo.find(
      {
        _id: {
          $in: directMessage.map(el => el.workspaceUserInfoId),
        },
      },
      {
        _id: 1,
        displayName: 1,
        profileUrl: 1,
        isActive: 1,
      },
    ).lean()

    const directMessageMember = directMessage.map(el => {
      const [currentConfig] = directMessageMemberInfo.filter(
        val => val._id.toString() === el.workspaceUserInfoId.toString(),
      )
      return { ...el, userInfo: currentConfig }
    })

    const result = channel.map(el => {
      const [currentConfig] = channelConfig.filter(
        val => val.channelId.toString() === el._id.toString(),
      )
      const directMessageMemberConfig = directMessageMember
        .filter(val => val.channelId.toString() === el._id.toString())
        .map(el => el.userInfo)
        .filter(el => el)

      return { ...currentConfig, ...el, member: directMessageMemberConfig }
    })

    result.sort(function (a, b) {
      return b.sectionId > a.sectionId ? -1 : b.sectionId == a.sectionId ? 0 : 1
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
  createChannel,
  checkDuplicate,
}
