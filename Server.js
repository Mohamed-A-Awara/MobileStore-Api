// Requires
const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const routes = require('./Routes/index.routes')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')


// Middlewares ❤️
app.use(morgan('dev'))
app.use(express.json()) 
app.use(cookieParser())

// Public Dictory to Upload Files 
app.use('/api/images' , express.static('./Uploads'))
// Routers
app.use(routes)



// DB Connection 👽
function dbConnention (){
    const url = process.env.DB_URl
    mongoose.connect(url).then(()=> console.log(`DB is Connected...`)).catch((e)=> console.log(e))
}


// Not Found Request
app.all('*' , (req , res)=>{
    res.status(400).send({
        Msg : "Request Not Fount ...! 😒"
    })
})

// Start Server 🤞
app.listen (port , ()=>{
    dbConnention()
    console.log(`app is running on port : ${port}...`);
    // console.log(process.env.DB_URL);
})