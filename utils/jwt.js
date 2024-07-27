import jwt from 'jsonwebtoken'
import { envs } from './constants.js'

export const creatJwt = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, envs.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

export const verifyJwt = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, envs.SECRET_KEY, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })
}
