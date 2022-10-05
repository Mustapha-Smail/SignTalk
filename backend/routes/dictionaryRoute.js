import express from 'express'
import { getDictionary, getDictionaryById, getRandomWord, getQuizzLsf, getQuizzFr } from '../controllers/dictionaryController.js'
const router = express.Router()

router.route('/').get(getDictionary)
router.route('/random').get(getRandomWord)
router.route('/quizz/lsf').get(getQuizzLsf)
router.route('/quizz/fr').get(getQuizzFr)
router.route('/:id').get(getDictionaryById)

export default router