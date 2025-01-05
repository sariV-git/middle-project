
const mongoose = require("mongoose")
const { type } = require("os")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase:true,
        trim:true
    },
    // password:{
    //     type:String,
    //     required:true
    //     },
    email: {
        type: String,
        lowercase: true,
        trim:true
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    roles:{
        type:String,
        enum:['User', 'Admin'],
        default:"User",
        },
        active: {
            type: Boolean,
            default: true,
            }
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)