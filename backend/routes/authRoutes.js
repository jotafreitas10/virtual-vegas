import express from 'express';
import { requestPasswordReset } from '../controllers/authController.js';

const router = express.Router();

// Rota para solicitar redefinição de senha
router.post('/reset-password', requestPasswordReset);

export default router;