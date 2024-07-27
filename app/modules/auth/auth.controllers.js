import { Router } from 'express'
import { signInUser, signUpUser, getMe } from './auth.service.js'
import { uploadSingle } from '../../middlewares/storage.middleware.js'
import { meValidation, signInValidation, signUpValidation } from './auth.validations.js'

const authRouter = Router()

authRouter.post('/sign-in', signInValidation, async (req, res) => {
  const { email, password } = req.body

  try {
    const { user, token } = await signInUser(email, password)
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

authRouter.post('/sign-up', uploadSingle({ fieldName: 'avatar' }), signUpValidation, async (req, res) => {
  try {
    const { user, token } = await signUpUser(req.body)
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

authRouter.get('/me', meValidation, async (req, res) => {
  const token = req.headers.authorization

  try {
    const user = await getMe(token)
    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export { authRouter }
