import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { uploadSingle } from './middlewares/storage.middleware.js'
import { errorHandlerMiddleware } from './middlewares/error.hadler.middleware.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.static('storage'))

app.post('/upload', uploadSingle({ fieldName: 'avatar' }), (req, res) => {
  console.log(req.headers)
  const { avatar, username, email, password } = req.body
  res.json({ avatar, username, email, password })
})

app.use(errorHandlerMiddleware)

export { app }
