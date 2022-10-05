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

export { lsfSchema }