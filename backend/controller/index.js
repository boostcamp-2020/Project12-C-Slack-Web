import express from 'express'

import channelCotroller from './channel'
import searchCotroller from './search'
import userController from './user'
import workspaceController from './workspace'

const router = express.Router()

router.use('/channel', channelCotroller)
router.use('/search', searchCotroller)
router.use('/user', userController)
router.use('/workspace', workspaceController)

module.exports = router
