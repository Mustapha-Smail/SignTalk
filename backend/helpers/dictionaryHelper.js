import asyncHandler from 'express-async-handler'

import Dictionary from '../models/Dictionary.js'

const getRandomPair = async (category) => {
    //Change cette ligne selon la catégorie en paramètres
    const randomPairs = await Dictionary.aggregate([
        {$match: { category:category }},
        {$sample: { size:4 }}
    ])

    if(randomPairs.length <= 0){
        return null
    }

    return randomPairs
}

export { getRandomPair }