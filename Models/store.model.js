const mongoose = require("mongoose");
const Schema = mongoose.Schema
const fs = require('fs')

const storeSchema = new Schema ({
    name : {type : String , required : true , trim : true},
    address : {type : String , required : true , trim : true},
    phone : {type : String , required : true , trim : true},
    logo : {type : String , trim : true , default : "/api/images/store/default.jpg"},
})

storeSchema.pre('findOneAndDelete' , async function (next){
    // console.log(this);

    // First get id of store
    const documnet = await this.model.findOne(this.getQuery()) // this.getQuery() => return _id of the store doc
    console.log(documnet);
    // console.log(documnet)
    if (documnet && documnet.logo){
        const logo = documnet.logo
        const imgName = logo.split('/')[4]
        console.log(imgName);
        fs.unlink('./Uploads/Store/' + imgName , (error)=>{
            if (error){
                console.log(error.message);
            }else{
                console.log("Image Deleted..");
            }
        })
    }
    next()
})


const Store = mongoose.model('Store' , storeSchema)
module.exports = Store