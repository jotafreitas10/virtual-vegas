import mongoose from 'mongoose';

const { Schema } = mongoose;

// Defina o esquema do comentário
const commentSchema = new Schema({
    userId: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Crie e exporte o modelo Comment baseado no esquema
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;