import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isNil } from '../../helpers/index.js'
import { EXPIRES_IN, SECRET_JWT_KEY } from '../../settings.js'

function generateToken (userId) {
  const token = jwt.sign({ id: userId }, SECRET_JWT_KEY, { expiresIn: EXPIRES_IN })

  return token
}

function validateUserAuth (token) {
  if (isNil(token)) {
    return null
  }

  const { id } = jwt.verify(token, SECRET_JWT_KEY) || {}

  return id
}

async function validatePassword (password, hashedPassword) {
  const itMatches = await bcrypt.compare(password, hashedPassword)

  return itMatches
}

export {
  generateToken,
  validateUserAuth,
  validatePassword
}
