import { isNil, not } from '../../helpers/index.js'
import { UsersModel } from '../../models/users/index.js'
import { validateLoginUser } from '../../schemas/users.schema.js'
import { TOKEN_NAME } from '../../settings.js'
import { generateToken, validatePassword, validateUserAuth } from './auth.controller.helper.js'

class authController {
  static async auth (req, res) {
    const userId = validateUserAuth(req.cookies[TOKEN_NAME])

    if (isNil(userId)) {
      return res.status(401).json({
        error: [
          {
            validation: 'auth',
            message: 'No hay una sesión activa.'
          }]
      })
    }

    try {
      const user = await UsersModel.getUser.byId({ id: userId })

      if (not(user.has_access)) {
        res.clearCookie(TOKEN_NAME)
        return res.status(401).json({
          error: [
            {
              validation: 'autenticacion',
              message: 'Esta cuenta no está activada.'
            }]
        })
      }

      return res.status(200).json({
        success: true,
        user: {
          ...user
        }
      })
    } catch (error) {
      return res.status(401).json({
        error: [
          {
            validation: 'auth',
            message: 'La sesión ha caducado.'
          }
        ]
      })
    }
  }

  static async login (req, res) {
    const result = validateLoginUser(req.body)

    if (not(result.success)) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const { nickname, password } = result.data
    const user = await UsersModel.getUser.byNickname({ nickname })

    if (isNil(user)) {
      return res.status(404).json({
        error: [
          {
            validation: 'email',
            message: 'El usuario no existe.'
          }]
      })
    }

    const isValidPassword = await validatePassword(password, user.password)
    if (not(isValidPassword)) {
      return res.status(401).json({
        error: [
          {
            validation: 'autenticacion',
            message: 'El nickname y/o la contraseña son incorrectos.'
          }]
      })
    }

    if (not(user.has_access)) {
      return res.status(401).json({
        error: [
          {
            validation: 'autenticacion',
            message: 'Esta cuenta no está activada.'
          }]
      })
    }

    const token = generateToken(user.id)
    const userLoggedIn = await UsersModel.getUser.byId({ id: user.id })

    return res.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 2
    }).status(201).json({
      success: true,
      user: {
        ...userLoggedIn
      }
    })
  }

  static async logout (_, res) {
    return res.clearCookie(TOKEN_NAME).status(200).json({
      success: true,
      message: 'Sesión cerrada.'
    })
  }
}

export { authController }
