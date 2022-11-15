import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/User.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // select is to choose what props to get 
            // -password is select all except password 
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.error(error)

            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    } 
    
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}) 

export {
    protect, 
}