import resMessage from './resMessage'
import statusCode from './statusCode'

const asyncWrapper = callback => {
  return (req, res, next) => {
    callback(req, res, next).catch(next)
  }
}

const verifyRequiredParams = (...params) => {
  for (const param of params)
    if (!param)
      throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
}

const dbErrorHandler = async callback => {
  try {
    return await callback()
  } catch (err) {
    console.log(err)
    throw {
      status: statusCode.DB_ERROR,
      message: resMessage.DB_ERROR,
    }
  }
}

module.exports = { asyncWrapper, verifyRequiredParams, dbErrorHandler }
