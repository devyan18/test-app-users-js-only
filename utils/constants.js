import path from 'node:path'

export const __dirname = path.resolve(path.dirname(''))
export const __filename = path.resolve(path.basename(''))

export const envs = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
  MONGODB_NAME: process.env.MONGODB_NAME || 'test',
  SECRET_KEY: process.env.SECRET_KEY || 'secret',
  APP_URL: process.env.APP_URL || 'http://localhost:4000',
  EMAIL_USER: process.env.EMAIL_USER || 'test@test.com',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'test'
}
