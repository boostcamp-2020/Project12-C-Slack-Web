const passport = require('passport')
import statusCode from '../util/statusCode'
import resMessage from '../util/resMessage'

exports.Auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user || !user.success) {
      next({
        status: statusCode.UNAUTHORIZED,
        message: resMessage.INVALID_TOKEN,
      })
    }
    req.user = user
    next()
  })(req, res, next)
}
