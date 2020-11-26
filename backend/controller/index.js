import express from 'express'

import channelCotroller from './channel'
import searchCotroller from './search'
import userController from './user'

const router = express.Router()

router.use('/channel', channelCotroller)
router.use('/search', searchCotroller)
router.use('/user', userController)

module.exports = router
