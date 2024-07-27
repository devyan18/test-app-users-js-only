import { body, header } from 'express-validator'
import { validate } from '../../middlewares/valid.middlewares.js'

const signIn = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]

const signUp = [
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]

export const tokenValidation = [
  header('authorization').isString().notEmpty()
]

export const signInValidation = [signIn, validate]
export const signUpValidation = [signUp, validate]
export const meValidation = [tokenValidation, validate]
