import express from 'express'
const router = express.Router()
const userController = require('./userController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ success: true })
})

router.get('/user/sign-in/github', userController.githubLogin)

router.get('/user/sign-in/github/callback', userController.githubCallback)

module.exports = router
