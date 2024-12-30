import { Router } from 'express'
import { userController } from '../controllers/users/users.controller.js'

const usersRouter = Router()

usersRouter.post('/', userController.register)
usersRouter.get('/', userController.getAll)
usersRouter.patch('/:id', userController.set)
usersRouter.get('/:id', userController.get)

export { usersRouter }
