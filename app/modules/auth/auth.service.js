import { envs } from '../../../utils/constants.js'
import { creatJwt, verifyJwt } from '../../../utils/jwt.js'
import { getUserByEmailAndPassword, createUser, getUserById } from '../users/user.service.js'

export const signInUser = async (email, password) => {
  try {
    const user = await getUserByEmailAndPassword(email, password)

    if (!user) throw new Error('User not found')

    const payload = {
      userId: user.id
    }
    const token = await creatJwt(payload)

    if (!token) throw new Error('Token not created')

    const userParsed = {
      ...user,
      avatar: `${envs.APP_URL}/public/${user.avatar}`
    }

    return { user: userParsed, token }
  } catch (error) {
    throw new Error(error)
  }
}

export const signUpUser = async (data) => {
  try {
    const {
      username,
      email,
      avatar,
      password
    } = data

    if (!username || !email || !password || !avatar) {
      throw new Error('Missing fields')
    }

    const user = await createUser(data)

    if (!user) throw new Error('User not created')

    const payload = {
      userId: user.id
    }

    const token = await creatJwt(payload)

    const userParsed = {
      ...user,
      avatar: `${envs.APP_URL}/public/${user.avatar}`
    }

    return { user: userParsed, token }
  } catch (error) {
    throw new Error(error)
  }
}

export const getMe = async (token) => {
  try {
    const { userId } = await verifyJwt(token)

    if (!userId) throw new Error('User not found')

    const user = await getUserById(userId)

    if (!user) throw new Error('User not found')

    return user
  } catch (error) {
    throw new Error(error)
  }
}
