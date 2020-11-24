const mongoose = require('mongoose')
const Schema = mongoose.Schema

const followSchema = mongoose.Schema(
  {
    workspaceUserInfoId: {
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceUserInfo',
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true },
)
const Follow = mongoose.model('Follow', followSchema)
module.exports = { Follow }
