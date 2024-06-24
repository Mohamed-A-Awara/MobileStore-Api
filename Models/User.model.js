const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true , unique : true },
    password: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    natioalID: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    isAdmin : {type : Boolean , default : false}
});

UserSchema.pre('save' , async function (next) {
    try {

        let user = this 
        if ( !user.isModified('password')){
            return next()
        }
        let hashedPass = await bcrypt.hash(user.password , 8)
        user.password = hashedPass
        next()
    }
    catch (error){
        next(error)
    }
})

UserSchema.methods.comparePassword =  function (pass){
    return bcrypt.compare (pass , this.password)
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
