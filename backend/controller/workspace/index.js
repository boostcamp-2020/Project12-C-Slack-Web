import express from 'express'
const { Auth } = require('../../middleware/auth')
const router = express.Router()
const controller = require('./workspace')

router.get('/', Auth, controller.getWorkspaces)
router.post('/', Auth, controller.createWorkspace)
router.post('/invite', Auth, controller.invite)

module.exports = router
