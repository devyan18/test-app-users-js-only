import { Router } from 'express'
import { createWorkspace, getWorkspaces, getWorkspaceById } from './workspace.service.js'
import { createValidations } from './workspace.validatios.js'
import { authMiddleware } from '../../middlewares/authentication.middleware.js'

const workspaceRouter = Router()

// create new workspace
workspaceRouter.post('/', authMiddleware, createValidations, async (req, res) => {
  const userId = req.user.id

  try {
    const newWorkspace = await createWorkspace(userId, req.body)

    res.json(newWorkspace)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// get all workspaces
workspaceRouter.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id

  try {
    const workspaces = await getWorkspaces(userId)

    res.json(workspaces)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// get workspace from id
workspaceRouter.get('/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  try {
    const workspace = await getWorkspaceById(userId, id)

    res.json(workspace)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export { workspaceRouter }
