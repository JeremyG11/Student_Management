const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { roles } = require('../config/roles')

const grantAccess = (action, resource)=>{
    return async (req, res, next )=>{
        
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
            
        try {
            const permissions = roles.can(decoded.user.roles)[action](resource)
            console.log(req.user)
            if(!permissions.granted){
                return res.status(403).json({
                    ErrorMessage:"Sorry! You don't have that permission"
                })
            }
            next()
        } catch (error) {
            res.status(400).json({error: error})
        }
    }
}
 

module.exports = {
    grantAccess,
}