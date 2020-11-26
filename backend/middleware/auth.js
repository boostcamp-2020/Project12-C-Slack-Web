const passport = require('passport')
require('dotenv').config()

exports.Auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user || !user.success) {
      next({ status: 500, message: 'auth error' })
    }
    req.user = user
    next()
  })(req, res, next)
}
