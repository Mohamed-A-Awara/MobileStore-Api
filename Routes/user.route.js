const express = require('express')
const { authorizeUser , authorizeAdmin } = require('../Services/authenticate.service')
const userControl = require('../Controllers/user.control')
const router = express.Router()
const {validateID} = require('../Services/validate.service')


router.get('/data' ,authorizeUser ,userControl.getUserData )
router.get('/data/admin' ,authorizeAdmin ,  userControl.getAllUsers )
router.delete('/:id' , validateID , authorizeAdmin , userControl.deleteUser)
router.patch('/data/update' , authorizeUser , userControl.updateUser)
router.post('/newUser' , authorizeAdmin , userControl.addUser)

module.exports = router
