const mongoose = require("mongoose")

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
    }
    catch(err){
console.error("ERROR"+err)
    }
}

module.exports=connectDB