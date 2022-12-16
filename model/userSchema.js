import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        require:true
    },
    "age":{
        type:Number,
        required:true
    },
    "startDate":{
        type:String,
        required:true
    },
    "batch":{
        type:Number,
        required:true
    },
    "payment":{
        type:Number,
        required:true
    }
})

const user = mongoose.model('user', userSchema)

export default user