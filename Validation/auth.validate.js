const Joi = require('joi')
const PassExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/


module.exports = {
    registerationSchema : Joi.object().keys({

        name : Joi.string().min(3).max(30).required().messages({
            'any.required' : "Name is required ! 😊"
        }),
        email : Joi.string().email().min(3).max(30).required().messages({
            'any.required' : "Email is required ! 😊",
            'string.email' : 'Invalid email ! 🤦‍♂️'
        }),
        password : Joi.string().regex(PassExp).required().messages({
            'any.required' : "Password is required ! 😊"
        }),
        address : Joi.string().min(3).max(30).required().messages({
            'any.required' : "Address is required ! 😊"
        }),
        natioalID : Joi.number().integer().min(10000000000000).max(99999999999999) .required().messages({
            'any.required' : "natioalID is required ! 😊",
            "number.min" : "National ID must be equal 14 digit",
            "number.max" : "National ID must be equal 14 digit"
        }),
        phone : Joi.string().regex(/^01\d{9}$/).required().messages({
            'any.required' : "phone is required ! 😊"
        }),
    }),

    loginSchema : Joi.object().keys({
        email : Joi.string().email().min(3).max(30).required().messages({
            'any.required' : "Email is required ! 😊",
            'string.email' : 'Invalid email ! 🤦‍♂️'
        }),
        password : Joi.string().required().messages({
            'any.required' : "Password is required ! 😊"
        }),
    }),

}