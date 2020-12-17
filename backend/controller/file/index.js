import express from 'express'
const { Auth } = require('../../middleware/auth')
const router = express.Router()
const controller = require('./file')

const multer = require('multer')
const storage = multer.memoryStorage()
const uploader = multer({ storage: storage })

router.post('/', Auth, uploader.single('file'), controller.uploadFile)
router.delete('/', Auth, controller.deleteFile)

module.exports = router
