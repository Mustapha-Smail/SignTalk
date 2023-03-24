import express from 'express'
import { getRoom } from '../controllers/callsController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, getRoom)

export default router