import resMessage from './resMessage'
import statusCode from './statusCode'

const asyncWrapper = callback => {
  return (req, res, next) => {
    callback(req, res, next).catch(next)
  }
}

const verifyRequiredParams = (...params) => {
  for (const param of params)
    if (isEmpty(param))
      throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
}

const dbErrorHandler = callback => {
  try {
    return callback()
  } catch (err) {
    console.log(err)
    throw {
      status: statusCode.DB_ERROR,
      message: resMessage.DB_ERROR,
    }
  }
}

const isEmpty = value => {
  if (value === null) return true
  if (typeof value === 'undefined') return true
  if (typeof value === 'string' && value === '') return true
  if (typeof value === 'object' && !Object.keys(value).length) return true
  return false
}
module.exports = { asyncWrapper, verifyRequiredParams, dbErrorHandler, isEmpty }
