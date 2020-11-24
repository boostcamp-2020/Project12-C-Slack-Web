const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = mongoose.Schema(
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
const File = mongoose.model('File', fileSchema)
module.exports = { File }
