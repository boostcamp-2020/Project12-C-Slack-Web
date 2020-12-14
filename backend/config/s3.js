import AWS from 'aws-sdk'
require('dotenv').config()

const S3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESSKEY,
    secretAccessKey: process.env.S3_SECRETKEY,
  },
})

const BUCKETNAME = process.env.S3_BUCKETNAME

module.exports = { S3, BUCKETNAME }
