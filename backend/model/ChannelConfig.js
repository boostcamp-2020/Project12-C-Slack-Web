const mongoose = require('mongoose')
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
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
    },
  },
  { timestamps: true },
)

const ChannelConfig = mongoose.model('ChannelConfig', channelConfigSchema)

module.exports = { ChannelConfig }
