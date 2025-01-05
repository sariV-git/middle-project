require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/ConnDB")
const { default: mongoose } = require("mongoose")
const PORT=process.env.PORT || 6500
const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/users",require("./routes/userRouts"))
app.use("/api/posts",require("./routes/postRouts"))
app.use("/api/todos",require("./routes/todoRouts"))
app.use("/api/auth", require("./routes/authRoutes"))

app.get("/",(req,res)=>{
    res.send("home page")
})

mongoose.connection.once('open',()=>{
    console.log("Connected to mongoDB")
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})    
})

mongoose.connection.on('error',err=>{
    console.log("err")
})

