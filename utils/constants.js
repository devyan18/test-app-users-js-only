import path from 'node:path'

export const __dirname = path.resolve(path.dirname(''))
export const __filename = path.resolve(path.basename(''))

export const envs = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
  MONGODB_NAME: process.env.MONGODB_NAME || 'test'
}
