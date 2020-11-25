const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

require('dotenv').config()

const githubStrategyOption = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}

async function gitStrategyLogin(profiles) {
  //git 정보가 db에 있는지 확인
  //   let user = await userDao.getUser(profiles.username)
  //   //db에 저장이 안 되어있을 경우 새로 db에 저장
  //   if (user === null) {
  //     try {
  //       const id = profiles.username
  //       const profile = profiles.photos[0].value
  //       const password = 'github'

  //       //   const result = await userDao.insertUser(id, password, profile)
  //     } catch (e) {
  //       return {
  //         success: false,
  //       }
  //     }
  //   } else if (user !== null && user.password !== 'github') {
  //     console.log('깃헙아님', user.password)
  //     //깃헙으로 가입하지 않은 아이디로 이미 가입되어져 있는 경우 오류 처리
  //     return {
  //       success: false,
  //     }
  //   }

  //   return {
  //     success: true,
  //     userId: profiles.username,
  //     profile: profiles.photos[0].value,
  //   }
  return {
    success: true,
    userId: 'rockpell',
    profile: 'a',
  }
}

async function githubVerify(accessToken, refreshToken, profile, done) {
  try {
    const result = await gitStrategyLogin(profile)
    const user = { userId: result.userId, profile: result.profile }

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
