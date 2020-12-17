import express from 'express'
const { Auth, InviteAuth } = require('../../middleware/auth')
const router = express.Router()
const controller = require('./workspace')

router.get('/', Auth, controller.getWorkspaces)
router.post('/', Auth, controller.createWorkspace)
router.post('/invite', Auth, controller.invite)
router.get('/invite/:code', InviteAuth, controller.invited)
router.get('/check-duplicate-name', Auth, controller.checkDuplicateName)
router.get('/info/:workspaceId', Auth, controller.getWorkspaceUserInfo)
router.get('/info', Auth, controller.getWorkspaceUserInfoByInfoId)

module.exports = router
