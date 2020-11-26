const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const { User } = require('../model/User')

require('dotenv').config()

const githubStrategyOption = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}

async function gitStrategyLogin(profiles) {
  try {
    let user = await User.findOne({ OAuthId: profiles.id })
    if (user === null) {
      await User.create({
        OAuthId: profiles.id,
        fullName: profiles.username,
        isDeleted: false,
      })
    }
  } catch (err) {
    return { success: false }
  }

  return {
    success: true,
    userId: profiles.id,
  }
}

async function githubVerify(accessToken, refreshToken, profile, done) {
  try {
    const result = await gitStrategyLogin(profile)
    const user = { userId: result.userId }

    if (result.success) {
      return done(null, user)
    }
    return done(null, false, { message: '깃허브 로그인에 실패했습니다.' })
  } catch (err) {
    return done(null, false, { message: 'GitHub verify err 발생' })
  }
}

module.exports = () => {
  passport.use(new GitHubStrategy(githubStrategyOption, githubVerify))
}
