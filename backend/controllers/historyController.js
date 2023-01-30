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

// @desc    Get scores of all user   
// @route   POST /api/history/all
// @access  Private 
const getAllScores = asyncHandler(async (req, res) => {

    const { gameType } = req.body

    console.log(req.body);

    const users = await User.find({}).select("nom , prenom")

    if (users) {

        const ids = []
        users.forEach(user => {
            ids.push(user._id)
        })

        const historyGame = await History.find({ userId: { $in: ids }, 'game.isCorrect': true, 'game.type': gameType }).select("userId  game.type game.isCorrect -_id")

        const counts = historyGame.reduce((count, item) => (
            count[item] = count[item] + 1 || 1
            , count), {})

        const score = Object.keys(counts).map(item => {
            const userId = item.match(/"((.*))"/)[1];
            const user = users.find(item => item._id == userId)

            return { id: user._id, nom: user.nom, prenom: user.prenom, score: counts[item] }
        })

        const sortedScore = score.sort(function (a, b) {
            return b.score - a.score
        })


        res.json(sortedScore)

    } else {
        res.status(404)
        throw new Error('No user found')
    }

})

// @desc    Get history by Id    
// @route   GET /api/history/:id
// @access  Private 
const getHistoryById = asyncHandler(async (req, res) => {
    const id = req.params.id

    const historyGame = await History.findById(id)

    if (!historyGame) {
        res.status(500)
        throw new Error('Internal Server Error')
    }
    res.status(200).json(historyGame)


})

// @desc    Delete history of a user   
// @route   DELETE /api/history
// @access  Private 
const deleteHistory = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        await History.deleteMany({ userId: user._id })

        res.status(200).json({ message: 'Historique supprimé avec succès!' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})



export {
    archiveGame,
    getHistory,
    getHistoryById,
    deleteHistory,
    getAllScores
}