import { arcadeDB } from '../arcade.db.model.js'

async function register ({ user }) {
  const {
    hasAccess,
    name,
    nickname,
    password
  } = user

  try {
    const [uuidResult] = await arcadeDB.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await arcadeDB.query(
        `INSERT INTO users (id, nickname, password, name, has_access)
        VALUES (UUID_TO_BIN('${uuid}'), ?, ?, ?, ?);`,
        [nickname, password, name, hasAccess])
    } catch (error) {
      throw new Error('Error al registrar el usuario')
    }

    const [users] = await arcadeDB.query(
      `SELECT nickname, name, BIN_TO_UUID(id) id
        FROM users WHERE id = UUID_TO_BIN(?);`,
      [uuid])

    return users[0]
  } catch {
    return null
  }
}

export { register }
