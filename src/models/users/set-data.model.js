import { arcadeDB } from '../arcade.db.model.js'

async function setData ({
  level,
  experience,
  coin,
  free_coin: freeCoin,
  weapon_1: weaponOne,
  weapon_2: weaponTwo,
  weapon_3: weaponThree,
  id
}) {
  try {
    await arcadeDB.query(
      `UPDATE users
      SET 
        level = ?,
        experience = ?,
        coin = ?,
        free_coin = ?,
        weapon_1 = ?,
        weapon_2 = ?,
        weapon_3 = ?
       WHERE id = UUID_TO_BIN(?);`,
      [level, experience, coin, freeCoin, weaponOne, weaponTwo, weaponThree, id])

    return { success: true }
  } catch {
    return { error: 'Error del servidor' }
  }
}

export { setData }
