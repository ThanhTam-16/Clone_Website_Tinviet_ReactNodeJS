import express from 'express';
import { createCart, addToCart, getCart, getMyCart, addToMyCart } from './cart.controller.js';
import { authGuard } from '../auth/auth.middleware.js';

const router = express.Router();

// guest (giữ để test)
router.post('/', createCart);
router.post('/items', addToCart);
router.get('/:cartId', getCart);

// user cart
router.get('/me/cart', authGuard, getMyCart);
router.post('/me/cart/items', authGuard, addToMyCart);

export default router;
