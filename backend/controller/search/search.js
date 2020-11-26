const { ChannelConfig } = require('../../model/ChannelConfig')
const { WorkspaceUserInfo } = require('../../model/WorkspaceUserInfo')

const searchUser = async (req, res, next) => {
  try {
    const keyword = req.body.keyword
    const channelId = req.body.channelId
    const workspaceId = req.body.workspaceId

    const userInfo = await WorkspaceUserInfo.find(
      {
        $or: [
          { fullName: new RegExp(keyword, 'i') },
          { displayName: new RegExp(keyword, 'i') },
        ],
        workspaceId: workspaceId,
      },
      { displayName: 1, profileUrl: 1, isActive: 1 },
    ).lean()
    const existMember = await ChannelConfig.find(
      {
        workspaceUserInfoId: { $in: userInfo.map(el => el._id) },
        channelId: channelId,
      },
      { _id: 0, workspaceUserInfoId: 1 },
    ).lean()

    res.status(200).json({ success: true, result: { userInfo, existMember } })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  searchUser,
}
