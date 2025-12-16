import express from 'express';
import { getBrands } from './brand.controller.js';

const router = express.Router();
router.get('/', getBrands); // GET /api/brands
export default router;
