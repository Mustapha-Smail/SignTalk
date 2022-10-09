import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { dictionary } from './data/dictionary.js'

import Dictionary from './models/Dictionary.js'
import Alphabet from './models/Alphabet.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Dictionary.deleteMany()
        await Alphabet.deleteMany()

        const createdDictionary = await Dictionary.insertMany(dictionary)
        const createdAlphabet = await Alphabet.insertMany(dictionary)

        console.log('Data Imported!');
        process.exit()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Dictionary.deleteMany()
        await Alphabet.deleteMany()

        console.log('Data Destroyed!');
        process.exit()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

if (process.argv[2] == '-d') destroyData()
else importData()