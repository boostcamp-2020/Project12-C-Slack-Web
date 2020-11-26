import express from 'express'
import controller from './channel'

const router = express.Router()

router.post('/', controller.createChannel)

module.exports = router
