import mongoose from 'mongoose'
import { lsfSchema } from './Lsf.js'

const dictionarySchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    lsf: lsfSchema,
    
}, {
    timestamps: true, 
})

const Dictionary = mongoose.model('Dictionary', dictionarySchema)

export default Dictionary