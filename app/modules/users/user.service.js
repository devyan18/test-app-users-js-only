import { UserModel } from './user.model.js'

export const createUser = async (user) => {
  try {
    const newUser = new UserModel(user)
    const savedUser = await newUser.save()

    return savedUser.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const getUserByEmailAndPassword = async (email, password) => {
  try {
    const userFound = await UserModel
      .findOne({ email })
      .populate('workspaces')
      .populate('invitations')

      .populate('invitations')

    if (!userFound) {
      throw new Error('User not found')
    }

    const isPasswordValid = await userFound.comparePassword(password)

    if (!isPasswordValid) {
      throw new Error('User not found')
    }

    return userFound.toJSON()
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getUserById = async (id) => {
  try {
    const userFound = await UserModel
      .findById(id)
      .populate('workspaces')
      .populate('invitations')

    if (!userFound) {
      throw new Error('User not found')
    }

    return userFound.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const updateUser = async (id, user) => {
  try {
    const userFound = await UserModel
      .findByIdAndUpdate(id, user, { new: true })
      .populate('workspaces')
      .populate('invitations')

    if (!userFound) {
      throw new Error('User not found')
    }

    return userFound.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const addWorkspace = async (userId, workspaceId) => {
  try {
    console.log({
      userId,
      workspaceId
    })
    await getUserById(userId)

    const userFound = await UserModel.findOneAndUpdate({
      _id: userId
    }, {
      $push: { workspaces: workspaceId }
    }, { new: true })
      .populate('workspaces')
      .populate('invitations')

    return userFound.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const addInvitation = async (userId, workspaceId) => {
  try {
    await getUserById(userId)

    const userFound = await UserModel
      .findOneAndUpdate({ _id: userId }, { $push: { invitations: workspaceId } }, { new: true })
      .populate('workspaces')
      .populate('invitations')

    return userFound.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const removeInvitation = async (userId, workspaceId) => {
  try {
    await getUserById(userId)

    const userFound = await UserModel
      .findOneAndUpdate({ _id: userId }, { $pull: { invitations: workspaceId } }, { new: true })
      .populate('workspaces')
      .populate('invitations')

    return userFound.toJSON()
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
