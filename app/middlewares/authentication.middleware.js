import { getMe } from '../modules/auth/auth.service.js'
import { tokenValidation } from '../modules/auth/auth.validations.js'

export const auth = async (req, res, next) => {
  const token = req.headers.authorization

  try {
    const bearer = token.split(' ')[0]
    if (bearer !== 'Bearer') throw new Error('Invalid bearer token')

    const partialToken = token.split(' ')[1]

    const user = await getMe(partialToken)

    req.user = user
    next()
  } catch (error) {
    if (error.message === 'Invalid bearer token') {
      return res.status(401).json({ message: 'Invalid bearer token' })
    }

    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export const authMiddleware = [tokenValidation, auth]
