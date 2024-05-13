import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { startGameSession, endGameSession, getUserStats } from '../controllers/userStatsController.js';

const router = express.Router();

router.route('/startsession').post(protect, startGameSession);
router.route('/endsession').post(protect, endGameSession);
router.route('/').get(protect, getUserStats);

export default router;