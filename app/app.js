import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandlerMiddleware } from './middlewares/error.hadler.middleware.js'
import { authRouter } from './modules/auth/auth.controllers.js'
import path from 'node:path'
import { __dirname } from '../utils/constants.js'
import { WorkspaceRouter } from './modules/workspaces/workspaces.api.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use('/public', express.static(path.join(__dirname, 'storage')))

app.use('/api/auth', authRouter)
app.use('/api/workspaces', WorkspaceRouter)

app.use(errorHandlerMiddleware)

export { app }
