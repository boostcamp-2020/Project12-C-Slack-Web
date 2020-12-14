import express from 'express'
import channelCotroller from './channel'
import searchCotroller from './search'
import userController from './user'
import workspaceController from './workspace'
import chatController from './chat'
import fileController from './file'
const router = express.Router()

router.use('/channel', channelCotroller)
router.use('/search', searchCotroller)
router.use('/user', userController)
router.use('/workspace', workspaceController)
router.use('/chat', chatController)
router.use('/file', fileController)

module.exports = router
