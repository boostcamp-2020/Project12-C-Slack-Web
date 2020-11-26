const express = require('express')
const router = express.Router()
const channelController = require('./channel')

/* GET /api/channle  get channel list  */
router.get('/', channelController.getChannelList)

/* GET /api/channle/{channelId}/info  get channel header info  */
router.get('/:channelId/info', channelController.getChannelHeaderInfo)

/* POST /api/channle/invite  invite user to channel  */
router.post('/invite', channelController.inviteUser)

/* PATCH /api/channle/mute  mute channel  */
router.patch('/mute', channelController.muteChannel)

module.exports = router
