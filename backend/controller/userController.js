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

// exports.githubLogin = passport.authenticate('github')

// exports.githubCallback = async (req, res, next) => {
//   const frontHost = process.env.FRONT_HOST
//   const profile = req.user.profile
//   console.log('githubCallback profile: ', profile)
//   if (profile) {
//     const token = jwt.sign(profile, process.env.JWT_SECRET)
//     console.log('token after')
//     res.cookie('token', token, {
//       maxAge: 1000 * 60 * 60,
//       httpOnly: true,
//       signed: true,
//     })
//     console.log('res.cookie: ', res.cookie)
//     return res.status(200).redirect(frontHost)
//   }
//   console.log('res.status(200).redirect(frontHost)')
//   return res.status(200).redirect(frontHost)
// }
