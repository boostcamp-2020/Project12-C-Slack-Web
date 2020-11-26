const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userHistorySchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
    },
    path: {
      type: Schema.Types.ObjectId,
      ref: 'channelId',
    },
  },
  { timestamps: true },
)
const UserHistory = mongoose.model('UserHistroy', userHistorySchema)
module.exports = { UserHistory }
