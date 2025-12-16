import express from 'express';
import { register, login, refresh, logout, me } from './auth.controller.js';
import { authGuard } from './auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authGuard, me);

export default router;
