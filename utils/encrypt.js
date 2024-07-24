import bcrypt from 'bcrypt'

export const hashStr = async (str) => {
  const salt = bcrypt.genSaltSync(10)
  return await bcrypt.hash(str, salt)
}

export const compareHash = async (str, hash) => {
  return await bcrypt.compare(str, hash)
}
