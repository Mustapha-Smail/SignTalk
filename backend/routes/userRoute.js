import express from 'express'
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)

router.post('/login', authUser)

router.route('/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile)

export default router