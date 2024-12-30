import { arcadeDB } from '../arcade.db.model.js'

async function getUserByNickname ({ nickname }) {
  try {
    const [users] = await arcadeDB.query(
      `SELECT nickname, password, has_access, BIN_TO_UUID(id) id
        FROM users WHERE nickname = ?;`,
      [nickname])

    return users[0]
  } catch {
    return null
  }
}

export { getUserByNickname }
