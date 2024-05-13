// Importe o modelo de comentário
import Comment from '../models/comment.js';

// Função para lidar com a postagem de comentários
const postComment = async (req, res) => {
    try {
        const { userId, comment } = req.body;
        
        // Verifique se userId e comment estão presentes
        if (!userId || !comment) {
            return res.status(400).json({ message: 'userId and comment are required' });
        }

        // Crie um novo comentário
        const newComment = new Comment({ userId, comment });

        // Salve o comentário no banco de dados
        await newComment.save();

        // Responda com uma mensagem de sucesso
        return res.status(201).json({ message: 'Comment posted successfully' });
    } catch (error) {
        // Em caso de erro, responda com uma mensagem de erro
        console.error('Error posting comment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export { postComment };