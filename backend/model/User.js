const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  OAuthId: {
    type: String,
  },
  fullName: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
  },
  profileUrl: {
    type: String,
  },
})
const User = mongoose.model('User', userSchema)
module.exports = { User }
