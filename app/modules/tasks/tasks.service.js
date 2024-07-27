import { WorkspaceModel } from '../workspaces/workspace.model.js'
import { getWorkspaceById } from '../workspaces/workspace.service.js'

export const createTask = async (userId, workspaceId, task) => {
  try {
    await getWorkspaceById(userId, workspaceId)

    const newTask = { ...task, assignee: userId }

    const workspace = await WorkspaceModel.findOneAndUpdate({ _id: workspaceId }, { $push: { tasks: newTask } }, { new: true })

    if (!workspace) throw new Error('Task not created')

    return workspace.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const toggleTask = async (userId, workspaceId, taskId) => {
  try {
    await getWorkspaceById(userId, workspaceId)

    const workspaceFound = await WorkspaceModel.findOneAndUpdate(
      { _id: workspaceId, 'tasks._id': taskId },
      { $set: { 'tasks.$.done': { $eq: [false, '$tasks.done'] } } },
      { new: true }
    )

    if (!workspaceFound) throw new Error('Task not found')

    return workspaceFound
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    throw error
  }
}

export const deleteTask = async (userId, workspaceId, taskId) => {
  try {
    await getWorkspaceById(userId, workspaceId)

    const workspaceFound = await WorkspaceModel.findOneAndUpdate(
      { _id: workspaceId },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    )

    if (!workspaceFound) throw new Error('Task not found')

    return workspaceFound
  } catch (error) {
    console.error('Error al eliminar la tarea:', error)
    throw error
  }
}
