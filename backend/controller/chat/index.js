const express = require('express')
const router = express.Router()
const controller = require('./chat')
const { Auth } = require('../../middleware/auth')

router.get('/:workspaceId/:channelId', Auth, controller.getChat)
router.get('/:workspaceId/:channelId/reply', controller.getReply)

module.exports = router
