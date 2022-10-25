import asyncHandler from 'express-async-handler'

import Alphabet from '../models/Alphabet.js'
import { sortAlphabetically } from '../helpers/alphabetHelper.js'

// @desc    Fetch all alphabet 
// @route   GET /api/alphabet
// @access  Public 
const getAlphabet = asyncHandler(async (req, res) => {
    const alphabet = await Alphabet.find({})
    alphabet.sort(function(a, b) {
        return sortAlphabetically(a.name, b.name)
    })
    res.json(alphabet)
})

// @desc    Get a letter by id  
// @route   GET /api/alphabet/:id
// @access  Public 
const getAlphabetById = asyncHandler(async (req, res) => {
    const letter = await Alphabet.findById(req.params.id)

    if (letter) res.json(letter)
    else {
        res.status(404)
        throw new Error('Letter not found')
    } 
})


// @desc    Get letters by word 
// @route   GET /api/alphabet/:word
// @access  Public 
const getAlphabetByWord = asyncHandler(async (req, res) => {
    const word = req.params.word.toUpperCase().split('')

    let letters = await Alphabet.find({
        'name': {
            $in: word
        }
    });

    let words = []

    word.forEach(wLetter => {
        const letter = letters.find( letter => letter.name === wLetter );
        
        words = [...words, letter]
    });


    if (words) {
        res.status(200).json(words)
    }   
    else {
        res.status(404)
        throw new Error('Letters not found')
    }


})

export { getAlphabet, getAlphabetById, getAlphabetByWord }