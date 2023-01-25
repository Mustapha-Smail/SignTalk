import express from 'express'
import { archiveGame, deleteHistory, getAllScores, getHistory, getHistoryById } from '../controllers/historyController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .get(protect, getHistory)
    .post(protect, archiveGame)
    .delete(protect, deleteHistory)

router.route('/all').post(getAllScores)

router.route('/:id').get(getHistoryById)

export default router