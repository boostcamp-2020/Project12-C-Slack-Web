require('dotenv').config()
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import controller from './controller'
import statusCode from './util/statusCode'
import resMessage from './util/resMessage'
import passport from 'passport'
import passportConfig from './config/passport'
import './chatServer'
import cors from 'cors'

const app = express()

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err))

app.use(logger('dev'))
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../dist')))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())
app.use(cors({ origin: true, credentials: true }))
passportConfig()

app.use('/api', controller)
app.use('/docs', express.static(path.join(__dirname, './docs')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})

// error handler
app.use(function (err, req, res, next) {
  if (err.status)
    return res.status(err.status).json({ success: false, message: err.message })
  return res
    .status(statusCode.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: resMessage.INTERNAL_SERVER_ERROR })
})

module.exports = app
