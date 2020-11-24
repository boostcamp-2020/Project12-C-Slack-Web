const mongoose = require('mongoose')
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

const Chat = mongoose.model('Chat', chatSchema)

module.exports = { Chat }
