import { verifyRequiredParams, dbErrorHandler } from '../util/'
import statusCode from '../util/statusCode'
import { S3, BUCKETNAME } from '../config/s3'
import { File } from '../model/File'

const getFile = async () => {}

const uploadFile = async ({ file, userId }) => {
  verifyRequiredParams(file, userId)
  const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`
  console.log('fileName: ', fileName)

  await S3.putObject({
    Bucket: BUCKETNAME,
    Key: fileName,
    ACL: 'public-read',
    Body: file.buffer,
  }).promise()

  const data = await dbErrorHandler(() =>
    File.create({
      name: fileName,
      path: '/',
      fileType: file.mimetype,
      creator: userId,
    }),
  )
  return { code: statusCode.OK, data: data, success: true }
}

const deleteFile = async () => {}

module.exports = {
  getFile,
  uploadFile,
  deleteFile,
}
