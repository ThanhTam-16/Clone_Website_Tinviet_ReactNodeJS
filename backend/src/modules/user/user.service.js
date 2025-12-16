import * as userModel from './user.model.js'

export const adminListUsers = async (query) => {
  const { q, role, status, page = 1, limit = 50 } = query
  return await userModel.listAdmin({ q, role, status, page, limit })
}

export const adminUpdateUser = async (id, payload) => {
  const existing = await userModel.findById(id)
  if (!existing) {
    const e = new Error('Không tìm thấy user')
    e.statusCode = 404
    throw e
  }
  return await userModel.updateById(id, payload)
}
