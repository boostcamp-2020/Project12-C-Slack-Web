const passport = require('passport')
const jwt = require('jsonwebtoken')

const httpCookieOption = {
  maxAge: 1000 * 60 * 60,
  httpOnly: true,
  signed: true,
}

const httpsCookieOption = {
  maxAge: 1000 * 60 * 60,
  httpOnly: true,
  signed: true,
  sameSite: false,
  secure: true,
}

exports.githubLogin = passport.authenticate('github')

exports.githubCallback = async (req, res, next) => {
  passport.authenticate('github', (err, id) => {
    if (err || !id) {
      return res.status(200).json({ verify: false })
    }
    req.login(id, { session: false }, err => {
      if (err) {
        res.send(err)
      }

      const token = jwt.sign(id, process.env.JWT_SECRET, { expiresIn: '1H' })
      console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
      res.cookie(
        'token',
        token,
        process.env.NODE_ENV === 'production'
          ? httpsCookieOption
          : httpCookieOption,
      )
      return res.status(200).json({ verify: true })
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
