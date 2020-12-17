import { verifyRequiredParams } from '../util/'
import statusCode from '../util/statusCode'
import { S3, BUCKETNAME } from '../config/s3'

const uploadFile = async ({ file, userId }) => {
  verifyRequiredParams(file, userId)
  const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`

  await S3.putObject({
    Bucket: BUCKETNAME,
    Key: fileName,
    ACL: 'public-read',
    Body: file.buffer,
  }).promise()
  const url = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKETNAME}/${fileName}`

  return {
    code: statusCode.OK,
    data: {
      name: fileName,
      originalName: file.originalname,
      fileType: file.mimetype,
      creator: userId,
      url: url,
    },
    success: true,
  }
}

const deleteFile = async ({ name }) => {
  verifyRequiredParams(name)
  await S3.deleteObject({
    Bucket: BUCKETNAME,
    Key: name,
  }).promise()
  return { code: statusCode.OK, success: true }
}

module.exports = {
  uploadFile,
  deleteFile,
}
