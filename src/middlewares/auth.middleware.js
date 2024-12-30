import { isNil } from '../helpers/index.js'
import { NO_AUTH_ROUTES, TOKEN_NAME } from '../settings.js'
import { validateUserAuth } from '../controllers/auth/auth.controller.helper.js'

const authMiddleware = (req, res, next) => {
  const isExcluded = NO_AUTH_ROUTES.some(
    (route) => route.method === req.method && route.path === req.path
  )

  if (isExcluded) {
    return next()
  }

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

  next()
}

export { authMiddleware }
