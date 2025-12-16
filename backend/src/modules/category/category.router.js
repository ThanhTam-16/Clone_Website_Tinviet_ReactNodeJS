import express from 'express';
import { getCategoryTree } from './category.controller.js';

const router = express.Router();

// GET /api/categories/tree?type=product
router.get('/tree', getCategoryTree);

export default router;
