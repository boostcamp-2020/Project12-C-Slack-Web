import express from 'express'
import channelCotroller from './channel'
import searchCotroller from './search'

const router = express.Router()

router.use('/channel', channelCotroller)
router.use('/search', searchCotroller)

module.exports = router
