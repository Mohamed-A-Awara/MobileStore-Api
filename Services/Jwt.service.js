const jwt = require('jsonwebtoken')

const generateToken =(payload)=>{
    return  jwt.sign({id : payload} , "3wara1712" , {
        expiresIn : "7d"
    })
}

module.exports = generateToken  