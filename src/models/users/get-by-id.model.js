import { arcadeDB } from '../arcade.db.model.js'

async function getUserById ({ id }) {
  try {
    const [users] = await arcadeDB.query(`SELECT name, nickname, has_access, BIN_TO_UUID(id) id
      FROM users WHERE id = UUID_TO_BIN(?);`, [id])

    return users[0]
  } catch {
    return null
  }
}

export { getUserById }
