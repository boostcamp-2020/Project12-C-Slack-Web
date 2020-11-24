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
  },
  { timestamps: true },
)
const Workspace = mongoose.model('Workspace', workspaceSchema)
module.exports = { Workspace }
