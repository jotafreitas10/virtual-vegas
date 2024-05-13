import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getSiteStats, updateSiteStats } from '../controllers/siteStatsController.js';

const router = express.Router();

router.route('/').get(getSiteStats).put(protect, updateSiteStats);

export default router;