import { envs } from '../../../utils/constants.js'
import { sendEmail } from '../mails/mail.services.js'
import { addInvitation, addWorkspace, getUserById, removeInvitation } from '../users/user.service.js'
import { WorkspaceModel } from '../workspaces/workspace.model.js'

export const inviteMemberToWorkspace = async (userId, workspaceId, memberId) => {
  let workspace
  let member
  try {
    workspace = await WorkspaceModel.findOne({ _id: workspaceId, owner: userId })
    if (!workspace) throw new Error('Workspace not found')
  } catch (e) {
    throw new Error('Error to find workspace')
  }

  try {
    member = await getUserById(memberId)
    if (!member) throw new Error('Member dont exist')
  } catch (error) {
    throw new Error('Error to find member')
  }

  try {
    await addInvitation(memberId, workspaceId)
  } catch (error) {
    throw new Error('Error to add invitation')
  }

  const link = (action) => `${envs.APP_URL}/api/workspaces/${action}?userId=${memberId}&workspaceId=${workspaceId}`

  const text = `
      <h1>Tienes una invitación para formar parte de ${workspace.nameOfWorkspace}</h1>
      <p>Para aceptar la invitación: <a href='${link('accept')}'>ACEPTAR<a> <p>
      <p>Para rechazar la invitación: <a href='${link('reject')}'>RECHAZAR<a> <p>
    `
  const subject = `Invitation to ${workspace.nameOfWorkspace} Workspace`

  try {
    const response = await sendEmail(member.email, subject, text, 'html')

    console.log(response)
  } catch (error) {
    console.log(error)
    throw new Error('Error to send email')
  }

  return member
}

export const addMemberToWorkspace = async (workspaceId, memberId) => {
  try {
    const workspace = await WorkspaceModel.findOneAndUpdate({ _id: workspaceId }, {
      $push: {
        members: memberId
      }
    })

    if (!workspace) throw new Error('Workspace not found')

    const member = await addWorkspace(memberId, workspaceId)

    if (!member) throw new Error('Member not added')

    await removeInvitation(memberId, workspaceId)

    return member
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const rejectInvitation = async (userId, workspaceId) => {
  try {
    await removeInvitation(workspaceId, userId)
  } catch (error) {
    throw new Error(error)
  }
}

export const removeMemberFromWorkspace = async (userId, workspaceId, memberId) => {
  try {
    const workspace = await WorkspaceModel.findOne({ _id: workspaceId, owner: userId })

    if (!workspace) throw new Error('Workspace not found')

    const workspaceFound = await WorkspaceModel.findOneAndUpdate({ _id: workspaceId }, { $pull: { members: memberId } }, { new: true })

    return workspaceFound
  } catch (error) {
    throw new Error(error)
  }
}
