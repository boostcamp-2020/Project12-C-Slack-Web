import express from 'express'
import userController from './user'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ success: true })
})

router.use('/user', userController)

module.exports = router
