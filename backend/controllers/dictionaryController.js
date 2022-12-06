import asyncHandler from 'express-async-handler'

import Dictionary from '../models/Dictionary.js'

import { getRandomPair } from '../helpers/dictionaryHelper.js'

// @desc    Fetch all dictionary 
// @route   GET /api/dictionary
// @access  Public 
const getDictionary = asyncHandler(async (req, res) => {
    const dictionary = await Dictionary.find({})

    res.json(dictionary)
})

// @desc    Get a Pair by id  
// @route   GET /api/dictionary/:id
// @access  Public 
const getDictionaryById = asyncHandler(async (req, res) => {
    const Pair = await Dictionary.findById(req.params.id)

    if (Pair) res.json(Pair)
    else {
        res.status(404)
        throw new Error('Pair not found')
    }
})

//@desc     Get a random Pair
//@route    GET /api/dictionary/random
//@access   Public
const getRandomWord = asyncHandler(async (req, res) => {

    const randomWords = await Dictionary.aggregate([{ $sample: { size: 1 } }])

    const randomWord = randomWords[0]

    if (randomWord) {
        res.json({
            id: randomWord._id
        })
    } else {
        res.status(500)
        throw new Error('Internal Server Error')
    }
})


//@desc     Get quizz LSF -> FR
//@route    GET /api/dictionary/quizz/lsf
//@access   Public 
const getQuizzLsf = asyncHandler(async (req, res) => {
    const randomPairs = await getRandomPair()

    if (!randomPairs) {
        res.status(500)
        throw new Error('Internal Server Error')
    }

    // get random index from the list of random words 
    const randomIndex = Math.floor(Math.random() * randomPairs.length)

    // get the pair from the random index 
    const randomPair = randomPairs[randomIndex]

    if (!randomPair) {
        res.status(500)
        throw new Error('Internal Server Error')
    }

    // create a list from the randoms words 
    const extractedWords = []

    randomPairs.forEach(pair => {
        extractedWords.push(pair.gloss)
    });

    // create the quizz to return 
    /**
     * quizz = {
     * multimedia : video_id, 
     * words: [word_1, word_2, word_3, word_4], 
     * correctWord: word_3
     * }
     */
    const quizz = {
        multimedia: randomPair.videoId,
        words: extractedWords,
        correctWord: randomPair.gloss
    }

    res.json(quizz)
})

//@desc     Get quizz LSF -> FR
//@route    GET /api/dictionary/quizz/fr
//@access   Public 
const getQuizzFr = asyncHandler(async (req, res) => {
    const randomPairs = await getRandomPair()

    if (!randomPairs) {
        res.status(500)
        throw new Error('Internal Server Error')
    }

    // get random index from the list of random words 
    const randomIndex = Math.floor(Math.random() * randomPairs.length)

    // get the pair from the random index 
    const randomPair = randomPairs[randomIndex]

    if (!randomPair) {
        res.status(500)
        throw new Error('Internal Server Error')
    }

    // create a list from the randoms words 
    const extractedMultimdeia = []

    randomPairs.forEach(pair => {
        extractedMultimdeia.push(pair.videoId)
    });

    // create the quizz to return 
    /**
     * quizz = {
     * word : word, 
     * multimedias: [video_id_0, video_id_1, video_id_2, video_id_3] 
     * ], 
     * correctMultimedia: video_id_3
     * }
     */
    const quizz = {
        word: randomPair.gloss,
        multimedias: extractedMultimdeia,
        correctMultimedia: randomPair.videoId
    }

    res.json(quizz)
})
export { getDictionary, getDictionaryById, getRandomWord, getQuizzLsf, getQuizzFr }