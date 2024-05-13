import asyncHandler from 'express-async-handler';
import Comment from '../models/commentModel.js';

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { text, gameName } = req.body;
  const comment = new Comment({
    text,
    user: req.user._id,
    gameName,
  });

  const createdComment = await comment.save();
  res.status(201).json(createdComment);
});

// @desc    Get comments for a specific game
// @route   GET /api/comments/game/:gameName
// @access  Public
const getCommentsByGameName = asyncHandler(async (req, res) => {
  const gameName = req.params.gameName;
  const comments = await Comment.find({ gameName }).populate('user', 'name username profileImage'); // Populate user details in comments

  res.json(comments);
});

export { createComment, getCommentsByGameName };