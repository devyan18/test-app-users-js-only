import { Router } from 'express'
import { removeInvitation } from '../users/user.service.js'
import { authMiddleware } from '../../middlewares/authentication.middleware.js'
import { addMemberToWorkspace, inviteMemberToWorkspace } from './members.service.js'

const MembersRouter = Router()

// Invite user from workspace
MembersRouter.patch('/invite', authMiddleware, async (req, res) => {
  const { workspaceId, memberId } = req.query
  const userId = req.user.id

  try {
    const workspace = await inviteMemberToWorkspace(userId, workspaceId, memberId)

    res.json(workspace)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// accept invitation for the workspace
MembersRouter.get('/accept', async (req, res) => {
  const { userId, workspaceId } = req.query

  try {
    await addMemberToWorkspace(workspaceId, userId)

    res.send('Accepted')
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

MembersRouter.patch('/accept', async (req, res) => {
  const { userId, workspaceId } = req.query

  try {
    await addMemberToWorkspace(workspaceId, userId)

    res.json({ accepted: true })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// reject invitation for the workspace
MembersRouter.get('/reject', async (req, res) => {
  const { userId, workspaceId } = req.query

  await removeInvitation(userId, workspaceId)

  res.json({ message: 'Rejected' })
})

MembersRouter.patch('/reject', async (req, res) => {
  const { userId, workspaceId } = req.query

  try {
    await addMemberToWorkspace(workspaceId, userId)

    res.json({ accepted: true })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export { MembersRouter }
