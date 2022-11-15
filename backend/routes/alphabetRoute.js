import express from 'express'
import { getAlphabet, getAlphabetById, getAlphabetByWord } from '../controllers/alphabetController.js'
const router = express.Router()

router.route('/').get(getAlphabet)
router.route('/word/:word').get(getAlphabetByWord)
router.route('/:id').get(getAlphabetById)

export default router