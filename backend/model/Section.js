const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    workspaceUserInfoId: {
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceUserInfoId',
    },
  },
  { timestamps: true },
)

const Section = mongoose.model('Section', sectionSchema)

module.exports = { Section }
