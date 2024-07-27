import { Router } from 'express'
import { authMiddleware } from '../../middlewares/authentication.middleware.js'
import { createTaskValidations, tasksChangesValidations } from '../workspaces/workspace.validatios.js'
import { createTask, deleteTask, toggleTask } from './tasks.service.js'

const TasksRouter = Router()

// Create new task from workspace
TasksRouter.post('/:workspaceId/tasks', authMiddleware, createTaskValidations, async (req, res) => {
  const { workspaceId } = req.params
  const { titleOfTask, descriptionOfTask } = req.body
  const userId = req.user.id

  try {
    const workspace = await createTask(userId, workspaceId, { titleOfTask, descriptionOfTask })

    res.json(workspace)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Toggle completed task from workspace
TasksRouter.patch('/:workspaceId/tasks/:taskId', authMiddleware, tasksChangesValidations, async (req, res) => {
  const { workspaceId, taskId } = req.params
  const userId = req.user.id

  try {
    const workspace = await toggleTask(userId, workspaceId, taskId)

    res.json(workspace)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete task from workspace
TasksRouter.delete('/:workspaceId/tasks/:taskId', authMiddleware, tasksChangesValidations, async (req, res) => {
  const { workspaceId, taskId } = req.params
  const userId = req.user.id

  try {
    const workspace = await deleteTask(userId, workspaceId, taskId)

    res.json(workspace)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export { TasksRouter }
