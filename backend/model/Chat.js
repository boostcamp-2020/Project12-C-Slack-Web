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
    file: {
      type: Object,
    },
  },
  { timestamps: true },
)

chatSchema.index({ createdAt: 1, channel: 1 })
chatSchema.index({ channel: 1, parentId: 1 })
chatSchema.index({ pinned: 1 })
chatSchema.index({ parentId: 1 })

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
    {
      $lookup: {
        from: 'reactions',
        let: { chatId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$chatId', '$$chatId'] } } },
          {
            $lookup: {
              from: 'workspaceuserinfos',
              let: { workspaceUserInfoId: '$workspaceUserInfoId' },
              pipeline: [
                {
                  $match: { $expr: { $eq: ['$_id', '$$workspaceUserInfoId'] } },
                },
                { $project: { displayName: 1, _id: 1 } },
              ],
              as: 'workspaceUserInfoId',
            },
          },
          { $unwind: '$workspaceUserInfoId' },
          {
            $group: {
              _id: { emotion: '$emoticon' },
              users: { $push: '$workspaceUserInfoId' },
            },
          },
          {
            $project: {
              _id: 0,
              emoji: '$_id.emotion',
              users: 1,
            },
          },
        ],
        as: 'reactions',
      },
    },

    { $limit: MAX_CHAT_MESSAGE },
  ])

chatSchema.statics.getReplyMessages = ({ channelId, parentId }) => {
  return Chat.aggregate([
    {
      $match: {
        _id: ObjectId(parentId),
      },
    },
    {
      $lookup: {
        from: 'chats',
        let: { chatId: '$_id' },
        pipeline: [
          {
            $match: {
              channel: ObjectId(channelId),
              parentId: ObjectId(parentId),
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
          {
            $lookup: {
              from: 'reactions',
              let: { chatId: '$_id' },
              pipeline: [
                { $match: { $expr: { $eq: ['$chatId', '$$chatId'] } } },
                {
                  $lookup: {
                    from: 'workspaceuserinfos',
                    let: { workspaceUserInfoId: '$workspaceUserInfoId' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$workspaceUserInfoId'],
                          },
                        },
                      },
                      {
                        $project: {
                          profileUrl: 1,
                          displayName: 1,
                          _id: 1,
                        },
                      },
                    ],
                    as: 'workspaceUserInfoId',
                  },
                },
                { $unwind: '$workspaceUserInfoId' },
                {
                  $group: {
                    _id: { emotion: '$emoticon' },
                    users: { $push: '$workspaceUserInfoId' },
                  },
                },
                {
                  $project: {
                    _id: 0,
                    emoji: '$_id.emotion',
                    users: 1,
                  },
                },
              ],
              as: 'reactions',
            },
          },
          { $sort: { createdAt: 1 } },
        ],
        as: 'reply',
      },
    },
    {
      $lookup: {
        from: 'reactions',
        let: { chatId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$chatId', '$$chatId'] } } },
          {
            $lookup: {
              from: 'workspaceuserinfos',
              let: { workspaceUserInfoId: '$workspaceUserInfoId' },
              pipeline: [
                {
                  $match: { $expr: { $eq: ['$_id', '$$workspaceUserInfoId'] } },
                },
                { $project: { displayName: 1, _id: 1 } },
              ],
              as: 'workspaceUserInfoId',
            },
          },
          { $unwind: '$workspaceUserInfoId' },
          {
            $group: {
              _id: { emotion: '$emoticon' },
              users: { $push: '$workspaceUserInfoId' },
            },
          },
          {
            $project: {
              _id: 0,
              emoji: '$_id.emotion',
              users: 1,
            },
          },
        ],
        as: 'reactions',
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
  ])
}

const Chat = mongoose.model('Chat', chatSchema)
module.exports = { Chat }
