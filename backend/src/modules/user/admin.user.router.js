import express from 'express'
import { authGuard, adminGuard } from '../auth/auth.middleware.js'
import * as userController from './user.controller.js'

const router = express.Router()
router.use(authGuard, adminGuard)

router.get('/', userController.adminListUsers)
router.put('/:id', userController.adminUpdateUser) // role/status/full_name/phone/email

export default router
