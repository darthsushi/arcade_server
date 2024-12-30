import bcrypt from 'bcrypt'
import { SALT_AROUNDS } from '../../settings.js'

async function hashPassword (password) {
  const salt = await bcrypt.genSalt(Number(SALT_AROUNDS))
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

function mergeUserData (user, userData) {
  return {
    ...user,
    ...userData
  }
}

export { hashPassword, mergeUserData }
