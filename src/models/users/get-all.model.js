import { arcadeDB } from '../arcade.db.model.js'

async function getAll () {
  try {
    const [users] = await arcadeDB.query(
      'SELECT level, name, nickname, experience, free_coin, coin, weapon_1, weapon_2, weapon_3, BIN_TO_UUID(id) id FROM users;'
    )

    return users
  } catch (error) {
    return []
  }
}

export { getAll }
