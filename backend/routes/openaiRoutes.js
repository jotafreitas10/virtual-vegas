import express from 'express';
import { getChatCompletion } from '../controllers/openaiController.js'; // Importe a função getChatCompletion diretamente

const router = express.Router();

// Rota para obter completions do chat
router.post('/chat-completions', async (req, res) => {
    const { message } = req.body;
    try {
        const completion = await getChatCompletion(message); // Use a função diretamente
        res.json({ completion });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter completions do chat' });
    }
});

export default router;