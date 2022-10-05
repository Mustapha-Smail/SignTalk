import mongoose from 'mongoose'
import { lsfSchema } from './Lsf.js'

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