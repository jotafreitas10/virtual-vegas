import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createComment, getCommentsByGameName } from '../controllers/commentController.js';

const router = express.Router();

router.route('/').post(protect, createComment); // Create a new comment
router.route('/game/:gameName').get(getCommentsByGameName); // Get comments for a specific game

export default router;