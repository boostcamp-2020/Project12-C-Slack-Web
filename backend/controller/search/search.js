const { WorkspaceUserInfo } = require('../../model/WorkspaceUserInfo')
const mongoose = require('mongoose')

const searchUser = async (req, res, next) => {
  try {
    const keyword = req.body.keyword
    const channelId = req.body.channelId
    const workspaceId = req.body.workspaceId

    const regexWord = new RegExp(keyword)

    const userInfoTest = await WorkspaceUserInfo.aggregate([
      {
        $match: {
          $expr: {
            $or: [
              { $regexMatch: { input: '$displayName', regex: regexWord } },
              { $regexMatch: { input: '$fullName', regex: regexWord } },
            ],
          },
          workspaceId: mongoose.Types.ObjectId(workspaceId),
        },
      },
      {
        $lookup: {
          from: 'channelconfigs',
          let: {
            workspaceUserInfoId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$workspaceUserInfoId', '$$workspaceUserInfoId'] },
                  ],
                },
                channelId: mongoose.Types.ObjectId(channelId),
              },
            },
            { $project: { _id: { $ifNull: [true, false] } } },
          ],
          as: 'isExist',
        },
      },
      {
        $project: {
          fullName: 1,
          displayName: 1,
          profileUrl: 1,
          isActive: 1,
          isExist: { $anyElementTrue: ['$isExist'] },
          resultss: 1,
        },
      },
    ])

    res.status(200).json({ success: true, result: userInfoTest })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  searchUser,
}
