const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/studentModel')

const protector = asyncHandler( async (req, res, next)=>{
    let token
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
            try{
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.SECRET_JWT)
                req.user = await User.findById(decoded.user.id).select('-password').exec()
                next()
            }catch(err){
                res.status(401)
                throw new Error("Unauthorized")
            }
        }
        if(!token){
            res.status(401)
            throw new Error("Unauthorized, No token")
        }
})

module.exports = {
    protector,
}