const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workspaceUserInfoSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    fullName: {
      type: String,
    },
    displayName: {
      type: String,
    },
    pause: {
      type: Date,
    },
    phoneNumber: {
      type: Number,
    },
    timeZone: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    status: {
      type: String,
    },
    expireStatus: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
    },
  },
  { timestamps: true },
)

const WorkspaceUserInfo = mongoose.model(
  'WorkspaceUserInfo',
  workspaceUserInfoSchema,
)

module.exports = { WorkspaceUserInfo }
