const Joi = require('joi')

module.exports ={
    addStore : Joi.object().keys({
        name : Joi.string().min(3).max(30).required().messages({
            'any.required' : "Name is required ! 😊"
        }),
        address : Joi.string().min(3).max(30).required().messages({
            'any.required' : "Address is required ! 😊"
        }),
        phone : Joi.string().regex(/^01\d{9}$/).required().messages({
            'any.required' : "phone is required ! 😊"
        }),
    })
}