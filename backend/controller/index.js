import express from 'express'
const router = express.Router()
const userController = require('./userController')
const { Auth } = require('../middleware/auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ success: true })
})

router.get('/user/sign-in/github', userController.githubLogin)
router.get('/user/sign-in/github/callback', userController.githubCallback)
router.get('/user/auth', userController.authCheck)

module.exports = router
