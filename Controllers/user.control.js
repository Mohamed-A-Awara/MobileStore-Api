const asyncHandler = require("express-async-handler");
const User = require("../Models/User.model");
const userControl  = {
    getUserData : asyncHandler( async (req , res )=> {
        console.log(req.user);
    }),
    getAllUsers : asyncHandler( async (req , res )=> {
        let users = await User.find()
        res.send(users)
    }),
    deleteUser : asyncHandler (async (req , res )=> {
        let id = req.params.id
        await User.findByIdAndDelete(id)
        res.send("Deleted..")
    }),
    updateUser : asyncHandler ( async (req , res )=> {
        let user = req.body
        let newData = await User.findByIdAndUpdate(user._id , req.body , {new : true})
        res.send({Update : newData})
    }),
    addUser : asyncHandler (async (req , res )=>{
        let user = new User(req.body)
        await user.save()
        res.send({AdminAdduser : user})
    })

}


module.exports = userControl