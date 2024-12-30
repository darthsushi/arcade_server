import { isNil, not } from '../../helpers/index.js'
import { UsersModel } from '../../models/users/index.js'
import { validateRegisterUser, validatePartialUser } from '../../schemas/users.schema.js'
import { hashPassword, mergeUserData } from './users.controller.helper.js'

class userController {
  static async getAll (_, res) {
    try {
      const users = await UsersModel.getUser.all()

      return res.status(200).json({
        users,
        success: true
      })
    } catch {
      return res.status(500).json({
        error: [
          {
            validation: 'server',
            message: 'Error al obtener los usuarios.'
          }
        ]
      })
    }
  }

  static async get (req, res) {
    const { id } = req.params

    const user = await UsersModel.getUser.dataById({ id })

    if (isNil(user)) {
      return res.status(400).json({
        error: [
          {
            validation: 'no user',
            message: 'El usuario no existe.'
          }]
      })
    }

    return res.status(200).json({
      user,
      success: true
    })
  }

  static async set (req, res) {
    const result = validatePartialUser(req.body)
    const { id } = req.params

    if (not(result.success)) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const user = await UsersModel.getUser.dataById({ id })

    if (isNil(user)) {
      return res.status(400).json({
        error: [
          {
            validation: 'no user',
            message: 'El usuario no existe.'
          }]
      })
    }

    const userData = mergeUserData(user, result.data)

    try {
      await UsersModel.setData(userData)

      return res.status(200).json({
        success: true
      })
    } catch {
      return res.status(500).json({
        error: [
          {
            validation: 'server',
            message: 'Error al actualizar los datos del usuario.'
          }
        ]
      })
    }
  }

  static async register (req, res) {
    const result = validateRegisterUser(req.body)

    if (not(result.success)) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const { nickname, name, password } = result.data
    const userExist = await UsersModel.validate.existByNickname({ nickname })

    if (userExist) {
      return res.status(400).json({
        error: [
          {
            validation: 'nickname',
            message: 'Ya hay un usuario con ese nickname.'
          }]
      })
    }

    const hashedPassword = await hashPassword(password)

    try {
      const user = await UsersModel.register({
        user: {
          name,
          nickname,
          hasAccess: true,
          password: hashedPassword
        }
      })

      return res.status(201).json({
        success: true,
        user
      })
    } catch {
      return res.status(500).json({
        error: [
          {
            validation: 'server',
            message: 'Error al registrar el usuario.'
          }
        ]
      })
    }
  }
}

export { userController }
