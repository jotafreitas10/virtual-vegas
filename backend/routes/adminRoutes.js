import express from 'express';
import { getUsers, searchUserByUsername, updateUser, deleteUser } from '../controllers/adminController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/get-users').get(protect, adminProtect, getUsers);
router.get('/search', protect, adminProtect, searchUserByUsername);
router.route('/:id').put(protect, adminProtect, updateUser).delete(protect, adminProtect, deleteUser);


export default router;