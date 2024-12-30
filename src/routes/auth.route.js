import { Router } from 'express'
import { authController } from '../controllers/auth/auth.controller.js'

const authRouter = Router()

authRouter.get('/', authController.auth)
authRouter.post('/login', authController.login)
authRouter.delete('/logout', authController.logout)

export { authRouter }
