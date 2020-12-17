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

exports.InviteAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user || !user.success) {
      const redirectURL = `${process.env.FRONTEND_HOST}/login?invitecode=${req.params.code}`
      res.status(statusCode.UNAUTHORIZED).redirect(redirectURL)
      return
    }
    req.user = user
    next()
  })(req, res, next)
}
