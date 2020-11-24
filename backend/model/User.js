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
})
const User = mongoose.model('User', userSchema)
module.exports = { User }
