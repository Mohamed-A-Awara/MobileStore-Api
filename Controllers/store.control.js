const asyncHandler = require("express-async-handler")
const Store = require('../Models/store.model')
const fs = require('fs')
const storeControl = {
    addStore :  asyncHandler (async (req , res )=>{
        let newStore = new Store(req.body)

        let file  = req.file // file information that user uploaded it in the form 
        // console.log(file );
        if (file ){
            let fileName = "/api/images/store/" + file.filename
            newStore.logo = fileName
        }
        await newStore.save()
        res.send()
    }),
    deleteStore : asyncHandler (async (req , res)=> {
        const id = req.params.id
        // const storeData = await Store.findById(id)
      

        await Store.findByIdAndDelete(id)
        

        res.send({
            Msg : "Deleted Done ..!"
        })
    }),

}
module.exports = storeControl
// const documnet = await this.model.findOne(this.getQuery()) // this.getQuery() => return _id of the store doc
//     // console.log(documnet);
//     console.log(documnet)
//     if (documnet && documnet.logo){
//         const logo = documnet.logo
//         const imgName = logo.split('/')
//         console.log(imgName);
//         fs.unlink('./Uploads/Store/' + imgName , (error)=>{
//             if (error){
//                 console.log(error.message);
//             }else{
//                 console.log("Image Deleted..");
//             }
//         })
//     }