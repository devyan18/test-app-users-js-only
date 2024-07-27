import { Router } from 'express'
import { workspaceRouter as WorkspaceManagerRouter } from './workspace.controller.js'
import { MembersRouter } from '../members/members.controller.js'
import { TasksRouter } from '../tasks/tasks.controller.js'

const WorkspaceRouter = Router()

WorkspaceRouter.use(MembersRouter)
WorkspaceRouter.use(WorkspaceManagerRouter)
WorkspaceRouter.use(TasksRouter)

export { WorkspaceRouter }
