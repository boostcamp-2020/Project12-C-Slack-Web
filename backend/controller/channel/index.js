const express = require('express')
const router = express.Router()

const { WorkspaceUserInfo } = require('../../model/WorkspaceUserInfo')
const { Channel } = require('../../model/Channel')
const { ChannelConfig } = require('../../model/ChannelConfig')
const { Chat } = require('../../model/Chat')

/* GET /api/channle  get channel list  */
router.get('/', async (req, res, next) => {
  try {
    const workspaceUserInfoId = req.query.workspaceUserInfoId

    const channelConfig = await ChannelConfig.find(
      {
        workspaceUserInfoId: workspaceUserInfoId,
      },
      { channelId: 1, readChatId: 1, isMute: 1, notification: 1, sectionId: 1 },
    ).exec()

    const channel = await Channel.find(
      {
        _id: { $in: channelConfig.map(el => el.channelId) },
      },
      { _id: 1, title: 1, channelType: 1 },
    ).exec()

    const result = channel.map(el => {
      let temp = {}
      channelConfig.some(val => {
        if (el._id.toString() == val.channelId.toString()) {
          temp = {
            ...JSON.parse(JSON.stringify(val)),
            ...JSON.parse(JSON.stringify(el)),
          }
          return true
        }
      })
      return temp
    })

    res.status(200).json({ success: true, result: result })
  } catch (err) {
    next(err)
  }
})

/* GET /api/channle/{channelId}/info  get channel header info  */
router.get('/:channelId/info', async (req, res, next) => {
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
})

module.exports = router
