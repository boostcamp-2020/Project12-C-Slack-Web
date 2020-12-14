const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = mongoose.Schema(
  {
    path: {
      type: String,
    },
    fileType: {
      type: String,
    },
    name: {
      type: String,
    },
    originalName: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)
const File = mongoose.model('File', fileSchema)
module.exports = { File }
