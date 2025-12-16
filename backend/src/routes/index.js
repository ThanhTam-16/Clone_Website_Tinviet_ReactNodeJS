import express from 'express';
import productRouter from '../modules/product/product.router.js';
import cartRouter from '../modules/cart/cart.router.js';
import authRouter from '../modules/auth/auth.router.js';
import orderRouter from '../modules/order/order.router.js';
import categoryRouter from '../modules/category/category.router.js';
import settingsRouter from '../modules/settings/settings.router.js';
import sliderRouter from '../modules/slider/slider.router.js';
import brandRouter from '../modules/brand/brand.router.js';

import adminProductRouter from '../modules/product/admin.product.router.js';
import adminCategoryRouter from '../modules/category/admin.category.router.js';
import adminUserRouter from '../modules/user/admin.user.router.js';


const router = express.Router();

router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter);
router.use('/settings', settingsRouter);
router.use('/sliders', sliderRouter);
router.use('/brands', brandRouter);

router.use("/admin/products", adminProductRouter);
router.use("/admin/categories", adminCategoryRouter);
router.use("/admin/users", adminUserRouter);

export default router;
