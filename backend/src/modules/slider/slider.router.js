import express from 'express';
import { getSliders } from './slider.controller.js';

const router = express.Router();
router.get('/', getSliders); // GET /api/sliders
export default router;
