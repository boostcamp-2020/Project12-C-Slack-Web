const crypto = require('crypto')

function encrypt(text) {
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
  const key = Buffer.from(ENCRYPTION_KEY, 'hex')
  let cipher = crypto.createCipheriv('des-ecb', key, null)
  let encrypted = cipher.update(text, 'utf8', 'hex')

  encrypted += cipher.final('hex')
  return encrypted
}

function decrypt(text) {
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
  const key = Buffer.from(ENCRYPTION_KEY, 'hex')
  let decipher = crypto.createDecipheriv('des-ecb', key, null)
  let decrypted = decipher.update(text, 'hex', 'utf8')

  decrypted += decipher.final('utf-8')
  return decrypted
}

module.exports = { decrypt, encrypt }
