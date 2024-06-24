const express = require('express')
const router = express.Router()
// import controller
const authControl = require('../Controllers/auth.control')
// const validators = require('../Validation/auth.validate')
const {registerationSchema, loginSchema } = require('../Validation/auth.validate')
const {validate_Func} = require('../Services/validate.service')



router.post ('/register' , validate_Func(registerationSchema),  authControl.register)
router.post ('/login' , validate_Func(loginSchema),  authControl.login)

module.exports = router