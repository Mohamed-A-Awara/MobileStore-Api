const multer = require("multer");
const path = require('path')
const {v4 : uuidv4} = require('uuid')

//First Step must create storage desk for images
const storeStorage  = multer.diskStorage({
    destination : function(req, file , callback){
        callback(null , "./Uploads/Store")
    },

    filename : function (req , file , callback){
        if (file){
            console.log(file);
            let fileExt = path.extname(file.originalname)
            callback(null , uuidv4() +fileExt )
        }else {
            callback(null , false)
        }
    },

})


const imageUpload = multer({
    storage : storeStorage ,
    fileFilter : function(req , file , callback){
        const fileTypes = /jpeg|jpg|png|gif|svg/ ;
        let validFiles = fileTypes.test(path.extname(file.originalname)) // Return true or false if valid

        if (file.mimetype.startsWith('image') && validFiles ){
            callback(null , true)
        }else {
            callback("Must be an Image!!" ,false )
        }
    },
    limits : {fileSize : 1024 * 1024 * 5}
})


module.exports = { imageUpload }

