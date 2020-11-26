import express from 'express'
import channelController from './channel'

const router = express.Router()

router.use('/channel', channelController)

module.exports = router
