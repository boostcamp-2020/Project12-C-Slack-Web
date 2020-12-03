const express = require('express')
const router = express.Router()
const controller = require('./chat')
const { Auth } = require('../../middleware/auth')
router.get('/:workspaceId/:channelId', Auth, controller.getChat)

module.exports = router
