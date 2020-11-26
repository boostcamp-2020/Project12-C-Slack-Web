const { WorkspaceUserInfo } = require('../../model/WorkspaceUserInfo')
const { Channel } = require('../../model/Channel')
const { ChannelConfig } = require('../../model/ChannelConfig')
const { Chat } = require('../../model/Chat')

/* GET /api/channle  get channel list  */
const getChannelList = async (req, res, next) => {
  try {
    const workspaceUserInfoId = req.query.workspaceUserInfoId

    const channelConfig = await ChannelConfig.find(
      {
        workspaceUserInfoId: workspaceUserInfoId,
      },
      { channelId: 1, readChatId: 1, isMute: 1, notification: 1, sectionId: 1 },
    ).lean()

    const channel = await Channel.find(
      {
        _id: { $in: channelConfig.map(el => el.channelId) },
      },
      { _id: 1, title: 1, channelType: 1 },
    ).lean()

    const result = channel.map(el => {
      let temp = {}
      channelConfig.some(val => {
        if (el._id.toString() == val.channelId.toString()) {
          temp = { ...val, ...el }
          return true
        }
      })
      return temp
    })

    res.status(200).json({ success: true, result: result })
  } catch (err) {
    next(err)
  }
}

const getChannelHeaderInfo = async (req, res, next) => {
  try {
    const channelId = req.params.channelId

    const pinned = await Chat.find({ pinned: true, channel: channelId }).exec()
    const channelConfig = await ChannelConfig.find({
      channelId: channelId,
    }).exec()
    const workspaceUserInfo = await WorkspaceUserInfo.find({
      _id: { $in: channelConfig.map(el => el.workspaceUserInfoId) },
    }).exec()

    const channel = await Channel.find(
      {
        _id: channelId,
      },
      { title: 1, topic: 1, channelType: 1 },
    ).exec()
    const extraData = {
      pinnedNum: pinned.length,
      memberNum: workspaceUserInfo.length,
      member: workspaceUserInfo,
    }

    let result = { ...JSON.parse(JSON.stringify(channel[0])), ...extraData }

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
        channelId: channelId,
        isMute: false,
        notification: 0,
        sectionId: null,
      })
      channelConfig.save()
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
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
        workspaceUserInfoId: workspaceUserInfoId,
        channelId: channelId,
      },
      { isMute: isMute },
    ).exec()

    res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getChannelList,
  getChannelHeaderInfo,
  inviteUser,
  muteChannel,
}
