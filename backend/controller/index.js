import express from 'express'
import channelRouter from './channel'
import searchRouter from './search'

const router = express.Router()

router.use('/channel', channelRouter)
router.use('/search', searchRouter)

module.exports = router
