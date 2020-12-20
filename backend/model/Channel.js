const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const channelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    topic: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceUserInfo',
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'workspace',
    },
    channelType: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  { timestamps: true },
)
channelSchema.index({ workspaceId: 1, channelType: 1 })

channelSchema.statics.getChannelBrowserData = async function (
  workspaceId,
  workspaceUserInfoId,
) {
  try {
    const channel = this

    const result = await channel.aggregate([
      {
        $match: {
          workspaceId: ObjectId(workspaceId),
          channelType: { $lt: 2 },
        },
      },
      {
        $lookup: {
          from: 'channelconfigs',
          let: {
            channelId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$channelId', '$$channelId'] },
                    {
                      $eq: [
                        '$workspaceUserInfoId',
                        ObjectId(workspaceUserInfoId),
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: 'join',
        },
      },
      {
        $project: {
          title: 1,
          channelType: 1,
          joined: {
            $cond: [{ $gte: [{ $size: '$join' }, 1] }, true, false],
          },
        },
      },
    ])

    return result
  } catch (err) {
    return err
  }
}
const Channel = mongoose.model('Channel', channelSchema)

module.exports = { Channel }
