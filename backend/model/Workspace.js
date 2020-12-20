const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    profileUrl: {
      type: String,
    },
    default_channel: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
  },
  { timestamps: true },
)
workspaceSchema.index({ name: 1 })

const Workspace = mongoose.model('Workspace', workspaceSchema)
module.exports = { Workspace }
