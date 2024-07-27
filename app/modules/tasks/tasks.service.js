import { WorkspaceModel, TaskModel } from '../workspaces/workspace.model.js'
import { getWorkspaceById } from '../workspaces/workspace.service.js'

export const createTask = async (userId, workspaceId, task) => {
  let newTask

  try {
    await getWorkspaceById(userId, workspaceId)
    newTask = new TaskModel({ ...task, assignee: userId })

    await newTask.save()
  } catch (err) {
    console.log(err)
    throw new Error('Error saving task')
  }

  try {
    const workspace = await WorkspaceModel.findOneAndUpdate({ _id: workspaceId }, { $push: { tasks: newTask.id } }, { new: true })

    if (!workspace) throw new Error('Task not created')

    return workspace.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const toggleTask = async (userId, workspaceId, taskId) => {
  try {
    await getWorkspaceById(userId, workspaceId)

    const taskFound = await TaskModel.findOneAndUpdate(
      { _id: taskId },
      [{ $set: { done: { $not: '$done' } } }],
      { new: true }
    )

    return taskFound
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    throw error
  }
}

export const deleteTask = async (userId, workspaceId, taskId) => {
  try {
    await getWorkspaceById(userId, workspaceId)

    const taskFound = await TaskModel.findOneAndDelete({ _id: taskId }, { new: true })

    if (!taskFound) throw new Error('Task not found')

    const workspaceFound = await WorkspaceModel.findOneAndUpdate(
      { _id: workspaceId },
      { $pull: { tasks: taskFound.id } },
      { new: true }
    )

    if (!workspaceFound) throw new Error('Task not found')

    return workspaceFound
  } catch (error) {
    console.error('Error al eliminar la tarea:', error)
    throw error
  }
}
