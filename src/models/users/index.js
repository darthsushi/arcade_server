import { register } from './register.user.model.js'
import { validateExistByNickname } from './validate-exist-by-nickname.user.model.js'
import { getUserById } from './get-by-id.model.js'
import { getUserByNickname } from './get-by-nickname.user.model.js'
import { getDataById } from './get-data-by-id.model.js'
import { setData } from './set-data.model.js'
import { getAll } from './get-all.model.js'

const UsersModel = {
  register,
  setData,
  validate: {
    existByNickname: validateExistByNickname
  },
  getUser: {
    all: getAll,
    dataById: getDataById,
    byNickname: getUserByNickname,
    byId: getUserById
  }
}

export { UsersModel }
