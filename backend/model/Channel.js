const mongoose = require('mongoose')
const Schema = mongoose.Schema

const channelSchema = mongoose.Schema(
  {
    title: {
      type: String,
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
    },
    channelType: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  { timestamps: true },
)

const Channel = mongoose.model('Channel', channelSchema)

module.exports = { Channel }
