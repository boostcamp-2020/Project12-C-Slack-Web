import express from 'express'
const router = express.Router()
const controller = require('./userController')

router.get('/sign-in/github', controller.githubLogin)
router.get('/sign-in/github/callback', controller.githubCallback)
router.get('/auth', controller.authCheck)

module.exports = router
