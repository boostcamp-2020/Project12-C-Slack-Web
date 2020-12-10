const express = require('express')
const router = express.Router()
const controller = require('./channel')
const { Auth } = require('../../middleware/auth')

/* GET /api/channle  get channel list  */
router.get('/', controller.getChannelList)

router.get('/check-duplicate-name', controller.checkDuplicate)

router.post('/', Auth, controller.createChannel)

/* GET /api/channle/{channelId}/info  get channel header info  */
router.get('/:channelId/info', controller.getChannelHeaderInfo)

/* POST /api/channle/invite  invite user to channel  */
router.post('/invite', controller.inviteUser)

/* PATCH /api/channle/mute  mute channel  */
router.patch('/mute', controller.muteChannel)

/* PATCH /api/channle/section  update channel section */
router.patch('/section', controller.updateChannelSection)

module.exports = router
