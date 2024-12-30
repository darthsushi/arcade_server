import express from 'express'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './middlewares/cors.middleware.js'
import { authMiddleware } from './middlewares/auth.middleware.js'
import { authRouter } from './routes/auth.route.js'
import { usersRouter } from './routes/users.route.js'
import { PORT } from './settings.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(corsMiddleware)
app.use(authMiddleware)

app.use('/', authRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log('server running on port ', PORT)
})
