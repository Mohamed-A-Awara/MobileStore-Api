const jwt = require('jsonwebtoken')
const User = require('../Models/User.model')
const asyncHandler = require('express-async-handler')



const authenticate = asyncHandler ( async (req , res , next)=>{
    // to access token you must use cookie-parser package ==> npm i cookie-parser use it in Serverjs
    let token = req?.cookies['access-token']
    if (!token){
        return res.status(401).send({Msg : "Token is required ! 🤦‍♂️ "})
    }
    // console.log(token);  // with Baraer 
    token = token?.split(' ')[1]
    // console.log(token); // without Baraer

    let decode = jwt.verify(token , "3wara1712")
    if (! decode ){
        return res.status(401).send({Msg : "Token is required ! 🤦‍♂️ "})
    }
    // console.log(decode); // return userid and expiredata of token

    let user = await User.findById(decode.id)
    // console.log(user);
    req.user = user
    // res.send('Accepted...')
    next()
})


// If Admin Account 
const adminAuth = (req , res  , next )=>{
    authenticate(req , res , ()=>{
        let user = req.user
        if (! user.isAdmin){
            return res.status(401).send({
                Msg : "This Route For Admin Only ..."
            })
        }else {
            next()
        }
        // console.log("Admin" , user);
    })
}

module.exports = {
    authorizeUser : authenticate,
    authorizeAdmin : adminAuth,
}