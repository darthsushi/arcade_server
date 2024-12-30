import mysql from 'mysql2'
import dotenv from 'dotenv'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../settings.js'

dotenv.config()

const arcadeDB = mysql
  .createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  })
  .promise()

export { arcadeDB }
