const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const JWTStrategy = require('passport-jwt').Strategy
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
      const data = await User.create({
        OAuthId: profiles.id,
        fullName: profiles.username,
        profileUrl:
          profiles?.photos[0]?.value ||
          'https://user-images.githubusercontent.com/56837413/102013276-583f6000-3d92-11eb-8184-186bc09f2a98.jpg',
        isDeleted: false,
      })
      return {
        success: true,
        id: data._id,
      }
    }
    return {
      success: true,
      id: user._id,
    }
  } catch (err) {
    return { success: false }
  }
}

async function githubVerify(accessToken, refreshToken, profile, done) {
  try {
    const result = await gitStrategyLogin(profile)
    const user = { id: result.id }

    if (result.success) {
      return done(null, user)
    }
    return done(null, false, { message: '깃허브 로그인에 실패했습니다.' })
  } catch (err) {
    return done(null, false, { message: 'GitHub verify err 발생' })
  }
}

const cookieExtractor = req => {
  if (req.signedCookies) return req.signedCookies.token
  if (req.cookies) return req.cookies
}

const isExist = async userId => {
  try {
    let user = await User.findOne({ _id: userId })
    return {
      success: true,
      id: user._id,
    }
  } catch (err) {
    return { success: false }
  }
}

const jwtStrategyOption = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
}
async function jwtVerify(payload, done) {
  try {
    const result = await isExist(payload.id)
    if (!result.success) {
      return done(null, false, { message: 'JWT 토큰 인증에 실패했습니다.' })
    }
    return done(null, result)
  } catch (err) {
    return done(null, false, { message: 'JWT verify err 발생' })
  }
}

module.exports = () => {
  passport.use(new GitHubStrategy(githubStrategyOption, githubVerify))
  passport.use(new JWTStrategy(jwtStrategyOption, jwtVerify))
}
