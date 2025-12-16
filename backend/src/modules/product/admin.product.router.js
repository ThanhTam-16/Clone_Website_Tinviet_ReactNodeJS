import express from 'express';
import { authGuard, adminGuard } from '../auth/auth.middleware.js';
import * as productController from './product.controller.js';

const router = express.Router();

router.use(authGuard, adminGuard);

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
