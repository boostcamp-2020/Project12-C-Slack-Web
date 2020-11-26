import express from 'express'
import userController from './user'
import channelController from './channel'

const router = express.Router()

router.use('/channel', channelController)

router.use('/user', userController)

module.exports = router
