import express from 'express'
import { getAlphabet, getAlphabetById, getAlphabetByWord } from '../controllers/alphabetController.js'
const router = express.Router()

router.route('/').get(getAlphabet)
router.route('/:id').get(getAlphabetById)
router.route('/:word').get(getAlphabetByWord)

export default router