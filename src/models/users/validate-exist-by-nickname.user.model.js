import { isEmpty, not } from '../../helpers/index.js'
import { arcadeDB } from '../arcade.db.model.js'

async function validateExistByNickname ({ nickname }) {
  try {
    const [users] = await arcadeDB.query(
      'SELECT BIN_TO_UUID(id) id FROM users WHERE nickname = ?;',
      [nickname])

    return not(isEmpty(users))
  } catch {
    return false
  }
}

export { validateExistByNickname }
