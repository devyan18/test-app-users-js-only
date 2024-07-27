import { WorkspaceModel } from './workspace.model.js'
import { addWorkspace } from '../users/user.service.js'

export const createWorkspace = async (userId, workspace) => {
  try {
    const newWorkspace = new WorkspaceModel({
      ...workspace,
      owner: userId
    })
    const savedWorkspace = await newWorkspace.save()

    if (!savedWorkspace) throw new Error('Workspace not created')
    try {
      await addWorkspace(userId, savedWorkspace._id)
    } catch (error) {
      console.log(error)
      throw new Error('error al agregar el workspace al usuario')
    }

    return savedWorkspace.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const getWorkspaces = async (userId) => {
  try {
    const workspaces = await WorkspaceModel.find({
      $or: [
        { owner: userId },
        { members: { $in: [userId] } }
      ]
    }).populate('owner').populate('members').populate('tasks').populate('tasks.assignee')

    const myWorkspaces = workspaces.map((workspace) => workspace.toJSON())

    for (const workspace of myWorkspaces) {
      workspace.isOwner = workspace.owner.id === userId
      delete workspace.owner
    }

    return myWorkspaces
  } catch (error) {
    throw new Error(error)
  }
}

export const getWorkspaceById = async (userId, workspaceId) => {
  try {
    const workspace = await WorkspaceModel.findOne({})
      .where('_id').equals(workspaceId)
      .where('$or').equals([{ owner: userId }, { members: { $in: [userId] } }])
      .populate('owner')
      .populate('members')
      .populate('tasks.assignee')

    if (!workspace) throw new Error('Workspace not found')

    const workspaceFound = workspace.toJSON()

    workspaceFound.isOwner = workspaceFound.owner.id.toString() === userId
    delete workspaceFound.owner

    return workspaceFound
  } catch (error) {
    throw new Error(error)
  }
}
