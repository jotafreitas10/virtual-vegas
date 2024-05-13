import express from 'express';
import { postComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rota para postar um comentário
router.post('/comments', protect, postComment);

export default router;