import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/User.js'

// @desc    Auth user & get token  
// @route   POST /api/users/login
// @access  Public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    // we can define in models methods 
    // User model has a method to compare passwords 
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})

// @desc    Register a new user  
// @route   POST /api/users
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
    const { nom, prenom, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        nom,
        prenom,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc    Get user profile  
// @route   GET /api/users/profile
// @access  Private 
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile  
// @route   PUT /api/users/profile
// @access  Private 
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.nom = req.body.nom || user.nom
        user.prenom = req.body.prenom || user.prenom
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
}