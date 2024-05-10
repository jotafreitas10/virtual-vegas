import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    const imageUrl = `http://localhost:5000/${user.profileImage.replace(/\\/g, '/').replace('public/', '')}`;
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      profession: user.profession,
      profileImage: imageUrl,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, dateOfBirth } = req.body;

  const userExists = await User.findOne({ username: username });

  if (userExists) {
    res.status(400);
    throw new Error('Nome de utilizador em uso');
  }

  const emailExists = await User.findOne({ email: email });

  if (emailExists) {
    res.status(400);
    throw new Error('O endereço de e-mail já existe');
  }

  const user = await User.create({
    name, 
    username,  
    email,  
    password, 
    dateOfBirth,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const imageUrl = `http://localhost:5000/${req.body.profileImage.replace(/\\/g, '/').replace('public/', '')}`;
    res.json({
      _id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
      dateOfBirth: req.user.dateOfBirth,
      profession: req.user.profession,
      gender: req.user.gender,
      profileImage: imageUrl,
      isAdmin: req.user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user profile image
// @route   GET /api/users/profile/image
// @access  Private
const getUserProfileImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const imageUrl = `http://localhost:5000/${user.profileImage.replace(/\\/g, '/').replace('public/', '')}`;
    res.json({
      profileImage: imageUrl,
    });
  } else {
    res.status(404);
    throw new Error('User Profile Picture not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    user.profession = req.body.profession || user.profession;
    user.gender = req.body.gender || user.gender;

    const updatedUser = await user.save();
    const imageUrl = `http://localhost:5000/${user.profileImage.replace(/\\/g, '/').replace('public/', '')}`;

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      dateOfBirth: updatedUser.dateOfBirth,
      profession:  updatedUser.profession,
      gender: updatedUser.gender,
      profileImage: imageUrl,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (!req.body.password) {
      res.status(400);
      throw new Error('A new password is required');
    }
    user.password = req.body.password;
    const updatedUser = await user.save();
    const imageUrl = `http://localhost:5000/${user.profileImage.replace(/\\/g, '/').replace('public/', '')}`;
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        dateOfBirth: updatedUser.dateOfBirth,
        profession: updatedUser.profession,
        gender: updatedUser.gender,
        profileImage: imageUrl,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile image
// @route   PUT /api/users/profileImage
// @access  Private
const updateUserProfileImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (req.file) {
      user.profileImage = req.file.path;
      await user.save();
    } else {
      res.status(400);
      throw new Error('No image file provided');
    }

    const imageUrl = `http://localhost:5000/${user.profileImage.replace(/\\/g, '/').replace('public/', '')}`;

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      profession: user.profession,
      gender: user.gender,
      profileImage: imageUrl,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  updateUserProfileImage,
  getUserProfileImage,
};
