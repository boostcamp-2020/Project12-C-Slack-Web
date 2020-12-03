const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const chatSchema = mongoose.Schema(
  {
    pinned: {
      type: Boolean,
    },
    contents: {
      type: String,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceUserInfo',
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
    isDelete: {
      type: Boolean,
    },
  },
  { timestamps: true },
)
chatSchema.statics.getChatMessages = ({ channelId, filter = {} }) =>
  Chat.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $match: {
        ...filter,
        channel: ObjectId(channelId),
        parentId: null,
      },
    },
    {
      $lookup: {
        from: 'chats',
        let: { id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$parentId', '$$id'] } } },
          {
            $lookup: {
              from: 'workspaceuserinfos',
              let: { creator: '$creator' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$creator'] } } },
                { $project: { profileUrl: 1, displayName: 1, _id: 1 } },
              ],
              as: 'replyUser',
            },
          },
          { $project: { pinned: 0, contents: 0, channel: 0, parentId: 0 } },
        ],
        as: 'reply',
      },
    },
    {
      $lookup: {
        from: 'workspaceuserinfos',
        localField: 'creator',
        foreignField: '_id',
        as: 'userInfo',
      },
    },
    { $limit: 20 },
  ])

const Chat = mongoose.model('Chat', chatSchema)

module.exports = { Chat }
