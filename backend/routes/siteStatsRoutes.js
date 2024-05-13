import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getSiteStats } from '../controllers/siteStatsController.js';

const router = express.Router();

router.get('/', protect, getSiteStats);

export default router;