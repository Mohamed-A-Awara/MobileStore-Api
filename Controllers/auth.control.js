const User  = require('../Models/User.model')
const asyncHandler = require('express-async-handler')
const generateToken = require('../Services/Jwt.service')

const authController = {
    register : asyncHandler( async (req ,res )=>{
        // res.send(req.body);
        const existUser = await User.findOne({email : req.body.email})

        // console.log(existUser);
        if (existUser){
            return res.status(409).send({Msg : "Email is already taken ! 🤦‍♂️"})
        }
        let newUser = await User(req.body)
        await newUser.save()
        res.status(201).send(newUser)
    }),

    login : asyncHandler( async (req , res )=>{
        // res.send("Login Done")
        const data = await req.body
        let user = await User.findOne({email : data.email})
        if (! user ){
            return res.status(400).send({Msg  : "Invalid email or password"})
        }
        let validPass = await user.comparePassword(data.password , user.password)
        if (! validPass){
            return res.status(400).send({Msg  : "Invalid email or password"})
        }
        let token = generateToken(user._id)
        // console.log(token);
        const cookieOption = {
            expires : new Date(
                Date.now() + 7*24*60*60*10000
            )
        }
        res.cookie('access-token' , `Barear ${token}` , cookieOption)
        res.status(200).send({token})
    })
}

module.exports = authController 