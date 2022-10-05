import asyncHandler from 'express-async-handler'

import Dictionary from '../models/Dictionary.js'

const getRandomPair = async () => {
    const randomPairs = await Dictionary.aggregate([{ $sample: { size:4 }}])

    if(randomPairs.length <= 0){
        return null
    }

    return randomPairs
}

export { getRandomPair }