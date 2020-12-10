const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema
import { MAX_CHAT_MESSAGE } from '../util/constant'

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
      default: false,
    },
  },
  { timestamps: true },
)
chatSchema.statics.getChatMessages = ({ channelId, currentCursor, fromDate }) =>
  Chat.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $match: {
        createdAt: fromDate
          ? { $gt: new Date(fromDate) }
          : { $lt: new Date(currentCursor) },
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
              as: 'userInfo',
            },
          },
          { $project: { pinned: 0, contents: 0, channel: 0, parentId: 0 } },
          { $unwind: '$userInfo' },
        ],
        as: 'reply',
      },
    },
    {
      $lookup: {
        from: 'workspaceuserinfos',
        let: { creator: '$creator' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$creator'] } } },
          { $project: { profileUrl: 1, displayName: 1, _id: 1 } },
        ],
        as: 'userInfo',
      },
    },
    { $unwind: '$userInfo' },

    { $limit: MAX_CHAT_MESSAGE },
  ])

const Chat = mongoose.model('Chat', chatSchema)
module.exports = { Chat }
