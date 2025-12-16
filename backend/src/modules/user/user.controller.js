import * as userService from './user.service.js'

export const adminListUsers = async (req, res, next) => {
  try {
    const data = await userService.adminListUsers(req.query)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const adminUpdateUser = async (req, res, next) => {
  try {
    const affected = await userService.adminUpdateUser(req.params.id, req.body)
    res.json({ message: 'Updated', affected })
  } catch (err) {
    next(err)
  }
}
