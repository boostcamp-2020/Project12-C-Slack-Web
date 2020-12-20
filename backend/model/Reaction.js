const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reactionSchema = mongoose.Schema({
  workspaceUserInfoId: {
    type: Schema.Types.ObjectId,
    ref: 'WorkspaceUserInfo',
  },
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
  },
  emoticon: {
    type: String,
  },
})
reactionSchema.index({ workspaceUserInfoId: 1, chatId: 1 })
reactionSchema.index({ chatId: 1 })

const Reaction = mongoose.model('Reaction', reactionSchema)
module.exports = { Reaction }
