import { verifyRequiredParams, dbErrorHandler } from '../util/'
import statusCode from '../util/statusCode'
import { S3, BUCKETNAME } from '../config/s3'
import { File } from '../model/File'
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const getFileURL = async ({ fileId }) => {
  verifyRequiredParams(fileId)

  const fileData = await dbErrorHandler(() =>
    File.findOne({
      _id: ObjectId(fileId),
    }),
  )

  return {
    code: statusCode.OK,
    data: `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKETNAME}/${fileData.originalName}`,
    success: true,
  }
}

const downloadFile = async ({ fileId }) => {}

const uploadFile = async ({ file, userId }) => {
  verifyRequiredParams(file, userId)
  const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`

  const result = await S3.putObject({
    Bucket: BUCKETNAME,
    Key: fileName,
    ACL: 'public-read',
    Body: file.buffer,
  }).promise()

  const data = await dbErrorHandler(() =>
    File.create({
      name: fileName,
      originalName: file.originalname,
      path: '/',
      fileType: file.mimetype,
      creator: userId,
      etag: result.ETag,
    }),
  )
  return {
    code: statusCode.OK,
    data: {
      fileId: data._id,
      fileName: data.originalName,
      fileType: data.fileType,
      creator: data.creator,
      etag: data.etag,
    },
    success: true,
  }
}

const deleteFile = async ({ fileId }) => {
  verifyRequiredParams(fileId)
  const fileData = await dbErrorHandler(() =>
    File.findOne({
      _id: ObjectId(fileId),
    }),
  )
  if (!fileData) {
    return { code: statusCode.BAD_REQUEST, success: false }
  }
  await dbErrorHandler(() =>
    File.deleteOne({
      _id: ObjectId(fileId),
    }),
  )
  await S3.deleteObject({
    Bucket: BUCKETNAME,
    Key: fileData.name,
  }).promise()
  return { code: statusCode.OK, success: true }
}

module.exports = {
  uploadFile,
  getFileURL,
  downloadFile,
  deleteFile,
}
