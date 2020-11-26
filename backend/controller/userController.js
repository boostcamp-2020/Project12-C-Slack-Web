const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.githubLogin = passport.authenticate('github')

exports.githubCallback = async (req, res, next) => {
  const frontHost = process.env.FRONT_HOST
  passport.authenticate('github', (err, profile) => {
    if (err || !profile) {
      return res.status(200).redirect(frontHost)
    }
    req.login(profile, { session: false }, err => {
      if (err) {
        res.send(err)
      }

      const token = jwt.sign(profile, process.env.JWT_SECRET)
      console.log('token: ', token)
      res.cookie('token', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        signed: true,
      })
      return res.status(200).redirect(frontHost)
    })
  })(req, res)
}

exports.auth = (req, res) => {
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
