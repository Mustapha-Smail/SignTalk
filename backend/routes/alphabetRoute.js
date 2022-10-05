import express from 'express'
import { getAlphabet, getAlphabetById } from '../controllers/alphabetController.js'
const router = express.Router()

router.route('/').get(getAlphabet)
router.route('/:id').get(getAlphabetById)

export default router