const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const channelConfigSchema = mongoose.Schema(
  {
    workspaceUserInfoId: {
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceUserInfo',
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
    readChatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
    isMute: {
      type: Boolean,
    },
    notification: {
      type: Number,
    },
    sectionName: {
      type: String,
    },
  },
  { timestamps: true },
)

channelConfigSchema.statics.getChannelHeaderInfo = async function (
  channelId,
  workspaceUserInfoId,
) {
  try {
    const channelConfig = this
    const result = await channelConfig.aggregate([
      {
        $match: {
          channelId: ObjectId(channelId),
          workspaceUserInfoId: ObjectId(workspaceUserInfoId),
        },
      },
      {
        $lookup: {
          from: 'channels',
          let: {
            channelId: '$channelId',
            workspaceUserInfoId: '$workspaceUserInfoId',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$_id', '$$channelId'] }],
                },
              },
            },
          ],
          as: 'channelId',
        },
      },
      { $unwind: '$channelId' },
      {
        $lookup: {
          from: 'chats',
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$pinned', true] }],
                },
              },
            },
          ],
          as: 'pinnedCount',
        },
      },
      {
        $set: {
          pinnedCount: { $size: '$pinnedCount' },
        },
      },
      {
        $lookup: {
          from: 'workspaceuserinfos',
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$_id', ObjectId(workspaceUserInfoId)] }],
                },
              },
            },
          ],
          as: 'member',
        },
      },
    ])
    return result
  } catch (err) {
    return err
  }
}

channelConfigSchema.statics.getChannelList = async function (
  workspaceUserInfoId,
) {
  try {
    const channelConfig = this
    const result = await channelConfig.aggregate([
      {
        $match: {
          workspaceUserInfoId: ObjectId(workspaceUserInfoId),
        },
      },
      { $project: { workspaceUserInfoId: 0 } },
      {
        $lookup: {
          from: 'channels',
          let: {
            channel_id: '$channelId',
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$channel_id'] },
              },
            },
            {
              $lookup: {
                from: 'channelconfigs',
                let: {
                  channel_id: '$_id',
                  channel_type: '$channelType',
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ['$channelId', '$$channel_id'] },
                          { $eq: ['$$channel_type', 2] },
                        ],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      workspaceUserInfoId: 1,
                    },
                  },
                  {
                    $lookup: {
                      from: 'workspaceuserinfos',
                      let: {
                        workspaceUserInfo_id: '$workspaceUserInfoId',
                      },
                      pipeline: [
                        {
                          $match: {
                            $expr: { $eq: ['$_id', '$$workspaceUserInfo_id'] },
                          },
                        },
                        {
                          $project: {
                            _id: 0,
                            displayName: 1,
                            profileUrl: 1,
                            isActive: 1,
                          },
                        },
                      ],
                      as: 'user',
                    },
                  },
                  {
                    $project: {
                      workspaceUserInfoId: 1,
                      displayName: '$user.displayName',
                      profileUrl: '$user.profileUrl',
                      isActive: '$user.isActive',
                    },
                  },
                  { $unwind: '$displayName' },
                  { $unwind: '$profileUrl' },
                  { $unwind: '$isActive' },
                ],
                as: 'member',
              },
            },
          ],
          as: 'channelId',
        },
      },
      { $unwind: '$channelId' },
    ])

    return result
  } catch (err) {
    return err
  }
}

const ChannelConfig = mongoose.model('ChannelConfig', channelConfigSchema)

module.exports = { ChannelConfig }
