import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  updateUserProfileImage,
  getUserProfileImage,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

// Use a configuração personalizada do multer
const upload = multer({ storage: storage });



router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put('/password', protect, updateUserPassword);
router.route('/profileImage')
  .put(protect, upload.single('profileImage'), updateUserProfileImage)
  .get(protect, getUserProfileImage);

export default router;
