import cors from 'cors'
import { ACCEPTED_ORIGINS } from '../settings.js'

const corsMiddleware = cors({
  credentials: true,
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})

export { corsMiddleware }
