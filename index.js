const cookieParser = require("cookie-parser");

const express=require("express")

const{connection}=require("./config/db")

const{userrouter}=require("./routes/useroute")
const{goldrouter}=require("./routes/goldroute")

const{authenticate}=require("./middleware/authenticate")

require("dotenv").config()

const app=express();

app.use(cookieParser())

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/users",userrouter)
app.use(authenticate)
app.use("/gold",goldrouter)


app.listen(process.env.port,async()=>{
    try {
        await connection 
        console.log("connected to db")
    } catch (error) {
        console.log("trouble while connecting to db")
    }
    console.log(`running at port${process.env.port}`)
})