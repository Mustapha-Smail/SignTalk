import express from 'express'
import { archiveGame , getHistory } from '../controllers/historyController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .get(protect, getHistory)
    .post(protect, archiveGame)

export default router