const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')



// Register a user 
// @ENDPOINT /api/users/register
// method: POST
const signUpUser = asyncHandler( async (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        res.status(400)
        throw new Error(" Please enter username and password")
    }
    
    // Check for user existance
    const userExist = await User.findOne({ username })
    if(userExist){
        res.status(400)
        throw new Error(" User with that username already exists")
    }
    
    // @HASH the user password hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // create a user 
    const user = await User.create({ 
        username, 
        password:hashedPassword, 
    })
    
    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("User couldn't be Registered, Invalid credentials")
    }
})

// Login the user 
// @ENDPOINT /api/users/login
// method: POST
const signInUser = asyncHandler( async(req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})
    if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            _id: user._id,
            username,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Couldn't login user with these credentials")
    }
})

// Update a user 
// @ENDPOINT /api/users/update/:user_id
// method: PUT

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.user_id)
    if(!user){
        res.status(404)
        throw new Error("Couldn't be updated, User not found ")
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.params.user_id, req.body, {new:true}).select('-password')
        res.status(200).json({
            data:updatedUser,
            message: 'User has been updated successfully'
        })
})
// Update a user 
// @ENDPOINT /api/users/update/:user_id
// method: PUT
const deleteUser = asyncHandler( async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.user_id)
    if(!deletedUser){
        res.status(404)
        throw new Error("Couldn't deleted, User not found")
    }
    res.status(200).json({
        data: deletedUser,
        message: 'User has been updated successfully'
    })

})

// Get all the users 
// @ENDPOINT /api/users
// method: GET
const getUsers = asyncHandler( async (req, res) => {

    const users = await User.find({}).select('-password')
    res.status(200).json({
        data:users
    })
})

// Get a single user 
// @ENDPOINT /api/users/:user_id
// method: GET
const getUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.user_id);
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }else{
        res.json({
            data:user
        })
    }
})

// Function to generate Token for a user
const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.SECRET_JWT,{
            expiresIn:'30d'
        })
}

module.exports = {
    signUpUser,
    signInUser,
    updateUser,
    deleteUser,
    getUsers,
    getUser,
}