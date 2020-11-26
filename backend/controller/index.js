import express from 'express'
import searchRouter from './search'

const router = express.Router()

router.use('/search', searchRouter)

module.exports = router
