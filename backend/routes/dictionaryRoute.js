import express from 'express'
import { getDictionary, getDictionaryById, getRandomWord, getQuizzLsf, getQuizzFr } from '../controllers/dictionaryController.js'
const router = express.Router()

router.route('/').get(getDictionary)
router.route('/random').post(getRandomWord)
router.route('/quizz/lsf').post(getQuizzLsf)
router.route('/quizz/fr').post(getQuizzFr)
router.route('/:id').get(getDictionaryById)

export default router