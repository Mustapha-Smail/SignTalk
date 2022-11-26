import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import History from '../models/History.js'

// @desc    Archive history of a game  
// @route   POST /api/history
// @access  Private 
const archiveGame = asyncHandler(async (req, res) => {
    const {
        type,
        details: {
            word,
            multimedias,
            correctMultimedia,
            multimedia,
            words,
            correctWord,
        },
        isCorrect,
    } = req.body


    const user = await User.findById(req.user._id)

    if (user) {

        const historyGame = History.create({
            game: {
                type,
                details: {
                    word,
                    multimedias,
                    correctMultimedia,
                    multimedia,
                    words,
                    correctWord,
                },
                isCorrect,
            },
            userId: user._id,
        })

        res.status(200).send("history added succefully")

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc    Get history of a user   
// @route   GET /api/history
// @access  Private 
const getHistory = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        const historyGame = await History.find({ userId: user._id })

        let count = {
            quizzLSF: {
                name: '4 mots 1 image',
                correct: 0,
                incorrect: 0,
            },
            quizzFR: {
                name: '4 images 1 mot',
                correct: 0,
                incorrect: 0,
            },
        }

        historyGame.map(game => {
            game.game.type === 'quizzLSF' ?
                game.game.isCorrect ? count.quizzLSF.correct++ : count.quizzLSF.incorrect++
                : game.game.isCorrect ? count.quizzFR.correct++ : count.quizzFR.incorrect++
        })


        res.status(200).json({ historyGame, count })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})



export {
    archiveGame,
    getHistory
}