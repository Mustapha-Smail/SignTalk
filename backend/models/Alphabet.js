import mongoose from 'mongoose'

const lsfSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, 
})

const alphabetSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    lsf: lsfSchema,
    
}, {
    timestamps: true, 
})

const Alphabet = mongoose.model('Alphabet', alphabetSchema)

export default Alphabet