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
const Reaction = mongoose.model('Reaction', reactionSchema)
module.exports = { Reaction }
