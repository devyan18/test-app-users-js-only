import { UserModel } from './user.model'

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
    const userFound = await UserModel.findOne({ email })

    if (!userFound) {
      throw new Error('User not found')
    }

    const isPasswordValid = await userFound.comparePassword(password)

    if (!isPasswordValid) {
      throw new Error('User not found')
    }

    return userFound.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}

export const getUserById = async (id) => {
  try {
    const userFound = await UserModel.findById(id)

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
    const userFound = await UserModel.findByIdAndUpdate(id, user, { new: true })

    if (!userFound) {
      throw new Error('User not found')
    }

    return userFound.toJSON()
  } catch (error) {
    throw new Error(error)
  }
}
