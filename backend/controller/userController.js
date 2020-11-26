const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.githubLogin = passport.authenticate('github')

exports.githubCallback = async (req, res, next) => {
  const frontHost = process.env.FRONT_HOST
  passport.authenticate('github', (err, userId) => {
    if (err || !userId) {
      return res.status(200).redirect(frontHost)
    }
    req.login(userId, { session: false }, err => {
      if (err) {
        res.send(err)
      }

      const token = jwt.sign(userId, process.env.JWT_SECRET)
      res.cookie('token', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        signed: true,
      })
      return res.status(200).redirect(frontHost)
    })
  })(req, res)
}

exports.authCheck = (req, res) => {
  let token = req.signedCookies.token
  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET)
      return res.json({ verify: true })
    } catch (err) {
      return res.json({ verify: false })
    }
  } else {
    return res.json({ verify: false, message: 'token does not exist' })
  }
}
