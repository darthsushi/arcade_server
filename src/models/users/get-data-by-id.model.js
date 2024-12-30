import { arcadeDB } from '../arcade.db.model.js'

async function getDataById ({ id }) {
  try {
    const [users] = await arcadeDB.query(`SELECT level, name, nickname, experience, free_coin, coin, weapon_1, weapon_2, weapon_3, BIN_TO_UUID(id) id
      FROM users WHERE id = UUID_TO_BIN(?);`, [id])

    return users[0]
  } catch {
    return null
  }
}

export { getDataById }
