import express from 'express';
import { getSettings } from './settings.controller.js';

const router = express.Router();
router.get('/', getSettings); // GET /api/settings
export default router;
