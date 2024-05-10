import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get all users
// @route   GET /api/admin/get-users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Pesquisar usuário por nome de usuário
// @route   GET /api/admin/search
// @access  Private/Admin
const searchUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.query;

  const user = await User.findOne({ username });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Utilizador não encontrado. Tente novamente.');
  }
});

// @desc    Atualizar informações do usuário
// @route   PUT /api/admin/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    user.profession = req.body.profession || user.profession;
    user.gender = req.body.gender || user.gender;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('Utilizador não encontrado. Tente novamente.');
  }
});

// @desc    Apagar usuário
// @route   DELETE /api/admin/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (user) {
    res.json({ message: 'Utilizador removido com sucesso.' });
  } else {
    res.status(404);
    throw new Error('Utilizador não encontrado. Tente novamente.');
  }
});

export { getUsers, searchUserByUsername, updateUser, deleteUser };