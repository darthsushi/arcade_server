import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SALT_AROUNDS,
  SECRET_JWT_KEY,
  NODE_ENV: ENVIRONMENT
} = process.env

const NO_AUTH_ROUTES = [
  { method: 'GET', path: '/' },
  { method: 'POST', path: '/login' },
  { method: 'POST', path: '/users' }
]

const ACCEPTED_ORIGINS = [
  'https://arcade.darthsushi.wtf',
  `http://localhost:${PORT}` // Own Server
]

const EXPIRES_IN = '48h'

const TOKEN_NAME = 'dasu_arcade_token'

export {
  ACCEPTED_ORIGINS,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  ENVIRONMENT,
  EXPIRES_IN,
  NO_AUTH_ROUTES,
  PORT,
  SALT_AROUNDS,
  SECRET_JWT_KEY,
  TOKEN_NAME
}
