import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './route.js'

dotenv.config()
const app = express()
const PORT = 5000
const MONGO_DB_URI = `mongodb+srv://shahid:c6PEteT99zP0lV2B@cluster0.galvxxg.mongodb.net/?retryWrites=true&w=majority`


//creating mongoose connection for database
mongoose.connect(MONGO_DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//validating mongoose connection
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo yeahhh")
})
mongoose.connection.on("error",(err)=>{ 
    console.log("error",err)
})




app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/', router)



app.get("/", (req,res) =>{
    res.send("hello");
})

app.listen(process.env.PORT || PORT, () => console.log('whola! server started'))


// //Import all dependencies,frameworks,models,routes
// const express =require('express')
// const mongoose=require('mongoose')
// const cors    =require('cors')
// require('dotenv').config()
// const app=express()

// //Routes

// const userRoute=require('./Routes/userInfoRoute')
// const paymentRoute=require('./Routes/paymentInfoRoute')



// //Middleware
// app.use(cors())
// app.use(express.json())

// app.get("/", (req,res) =>{
//     res.send("hello");
// })


// const MONGO_DB_URI = 


// //creating mongoose connection for database
// mongoose.connect(MONGO_DB_URI,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })


// //validating mongoose connection
// mongoose.connection.on("connected",()=>{
//     console.log("connected to mongo yeahhh")
// })
// mongoose.connection.on("error",(err)=>{ 
//     console.log("error",err)
// })




// //Implement routing
// app.use(userRoute);
// app.use(paymentRoute)

// //Start the server
// app.listen(PORT,hostname,()=>{
//     console.log(`Server is running on `)
// })