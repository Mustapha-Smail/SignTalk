import express from 'express'
import { getRoom } from '../controllers/callsController.js'
const router = express.Router()

router.route('/').get(getRoom)

export default router