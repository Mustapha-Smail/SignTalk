import mongoose from 'mongoose'

const dictionarySchema = mongoose.Schema({
    videoId: {
        type: String,
        required: true,
    },
    gloss: {
        type: String, 
        required: true,
    },
    type: {
        type: String, 
        required: true,
    },
    category: {
        type: String, 
        // required: true,
    },
    start: {
        type: String, 
        // required: true,
    },
    end: {
        type: String, 
        // required: true,
    },
    
}, {
    timestamps: true, 
})

const Dictionary = mongoose.model('Dictionary', dictionarySchema)

export default Dictionary