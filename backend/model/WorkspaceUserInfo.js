const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const workspaceUserInfoSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    fullName: {
      type: String,
    },
    displayName: {
      type: String,
    },
    pause: {
      type: Date,
    },
    phoneNumber: {
      type: Number,
    },
    timeZone: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    status: {
      type: String,
    },
    expireStatus: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
    },
    sections: {
      type: Schema.Types.Array,
    },
  },
  { timestamps: true },
)

workspaceUserInfoSchema.index({ workspaceId: 1, userId: 1 })
workspaceUserInfoSchema.index({ userId: 1 })

workspaceUserInfoSchema.statics.getWorkspaceUserInfo = async function (
  workspaceUserInfoId,
) {
  try {
    const WorkspaceUserInfo = this
    const result = await WorkspaceUserInfo.aggregate([
      {
        $match: {
          $expr: {
            $and: [{ $eq: ['$_id', ObjectId(workspaceUserInfoId)] }],
          },
        },
      },

      {
        $lookup: {
          from: 'workspaces',
          let: {
            workspaceId: '$workspaceId',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$_id', '$$workspaceId'] }],
                },
              },
            },
          ],
          as: 'workspaceId',
        },
      },
      { $unwind: '$workspaceId' },
      {
        $project: {
          _id: 1,
          displayName: 1,
          profileUrl: 1,
          isActive: 1,
          sections: 1,
          workspaceId: 1,
        },
      },
    ])

    return result
  } catch (err) {
    return err
  }
}

const WorkspaceUserInfo = mongoose.model(
  'WorkspaceUserInfo',
  workspaceUserInfoSchema,
)

module.exports = { WorkspaceUserInfo }
