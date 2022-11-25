import mongoose, { Schema } from 'mongoose'
import {} from './User.js'

const gameSchema = mongoose.Schema({
    type: {
        type: String, 
        required: true, 
    }, 
    details: {
        word: {
            type: String, 
        },
        multimedias: [String], 
        correctMultimedia: {
            type: String, 
        }, 
        multimedia: {
            type: String, 
        }, 
        words: [String], 
        correctWord: {
            type: String, 
        }, 
    }, 
    isCorrect: {
        type: Boolean
    }, 
})

const historySchema = mongoose.Schema({
    game: gameSchema,
    userId: {
        type: Schema.Types.ObjectId,
        required: true, 
    },
    
}, {
    timestamps: true, 
})

const History = mongoose.model('History', historySchema)

export default History