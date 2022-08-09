const express = require('express');
const router = express.Router()

const { 
    signUpUser, 
    signInUser, 
    updateUser, 
    deleteUser,
    getUsers, 
    getUser } = require('../controllers/userController')

const  { protector }  = require('../middlewares/authMiddleware')
const  { grantAccess }  = require('../middlewares/rolesMiddleware')


router.post('/register', signUpUser)
router.post('/login', signInUser)
router.put('/update/:user_id', protector, grantAccess('updateAny', 'profile'), updateUser)
router.delete('/delete/:user_id', protector, grantAccess('deleteAny', 'profile'), deleteUser)
    
router.get('/', getUsers)
router.get('/:user_id', getUser)

module.exports = router