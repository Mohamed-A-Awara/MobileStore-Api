const { default: mongoose } = require("mongoose")

module.exports = {

    validate_Func : function (schema) {
        return (req , res , next)=>{
            // abortEarly ==> to return all error as array of objects
            const {error} = schema.validate(req.body , {abortEarly : false})
            if (error){
                let errMsg = error.details.map((item)=>{
                    // console.log(item);
                    return {message : item.message , path : item.path}
                })
                return res.status(404).send( errMsg)
            }
            next()
            // console.log(error); // if found error it will log it 
        }
    }, 
    validateID :   (req , res , next )=>{
            let id  = req.params.id 
            // console.log(id);
            if (! id || ! mongoose.isValidObjectId(id)){
                return res.status(400).send({
                    Msg : "Object Id is Required...!"
                })
            }   
            next()
        }
    
}