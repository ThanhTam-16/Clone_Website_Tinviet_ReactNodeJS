import express from 'express';
import { authGuard } from '../auth/auth.middleware.js';
import { checkout, myOrders, myOrderDetail } from './order.controller.js';

const router = express.Router();

router.post('/checkout', authGuard, checkout);
router.get('/me', authGuard, myOrders);
router.get('/me/:orderId', authGuard, myOrderDetail);

export default router;
