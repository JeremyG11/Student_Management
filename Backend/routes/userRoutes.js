const express = require('express');
const router = express.Router()

const { 
    signUpUser, 
    signInUser, 
    updateUser, 
    deleteUser,
    getUsers, 
    getUser } = require('../controllers/userController')
 
const  grantAccess  = require('../middlewares/rolesMiddleware')
// Backend/middlewares/rolesMiddleware.js


router.post('/register', signUpUser)
router.post('/login', signInUser)
router.put('/update/:user_id', updateUser)
router.delete('/delete/:user_id', deleteUser)
router.get('/', getUsers)
router.get('/:user_id', getUser)

module.exports = router