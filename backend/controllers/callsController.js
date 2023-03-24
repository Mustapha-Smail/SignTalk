import asyncHandler from 'express-async-handler'
import axios from 'axios'
import User from '../models/User.js'

// @desc    Fetch all dictionary 
// @route   GET /api/dictionary
// @access  Public 
const getRoom = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                Authorization: "Bearer " + process.env.DAILY_API_KEY,
            },
        };

        const ROOM_ID = process.env.DAILY_ROOM_ID

        const call = await axios.get(`https://api.daily.co/v1/rooms/${ROOM_ID}`, config)
        if (call.status === 200) {
            res.json(call.data)
        } else {
            res.status(404)
            throw new Error('Room not found')
        }
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})

export { getRoom }