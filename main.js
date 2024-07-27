import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { app } from './app/app.js'
import { __dirname, envs } from './utils/constants.js'
import { connectToDB } from './db/connect.js'

async function createIfNotExistFolder (folderPath) {
  try {
    await fs.access(folderPath)
  } catch (error) {
    await fs.mkdir(folderPath, { recursive: true })
  }
}

async function startApp () {
  const storagePath = path.join(__dirname, 'storage')

  await createIfNotExistFolder(storagePath)

  await connectToDB(envs.MONGODB_URI, envs.MONGODB_NAME)

  app.listen(envs.PORT, () => {
    console.log(`Server is running on http://localhost:${envs.PORT}`)
  })
}

startApp()
