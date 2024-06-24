const express = require("express");
const router = express.Router()
const storeControl = require('../Controllers/store.control')
const {authorizeAdmin } = require('../Services/authenticate.service')
const {imageUpload} = require('../Services/file-upload')
const {addStore} = require('../Validation/store.validate')
const {validate_Func , validateID} = require('../Services/validate.service')

router.post('/addstore' ,imageUpload.single('logo'), authorizeAdmin ,validate_Func(addStore) , storeControl.addStore )
router.delete('/:id' , authorizeAdmin , validateID ,  storeControl.deleteStore)

module.exports = router
