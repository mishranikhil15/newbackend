const express=require("express")

const{ UserModel}= require("../model/usermodel")

const userrouter= express.Router()

const bcrypt= require("bcrypt");

const jwt = require("jsonwebtoken")

const fs= require("fs")

const {authenticate}=require("../middleware/authenticate");
const e = require("express");


userrouter.post("/signup",async(req,res)=>{
    const {email,pass,name,age,role}=req.body;

    try {
        bcrypt.hash(pass,5,async(err,secure_password)=>{
            if(err){
                console.log(err)
            }else{
                const user = new UserModel({email,pass:secure_password,name,age,role})
                await user.save();
                res.json("registerd")
            }
        })
    } catch (error) {
        res.send("Error while registering the user")
        console.log(error)
    }
})

userrouter.post("/login",async (req,res)=>{
    const {email,pass}=req.body;
    

    

    try {
       const user= await UserModel.find({email:email});
       const hashed_pass= user[0].pass;
       if(user.length>0){
        bcrypt.compare(pass,hashed_pass,(err,result)=>{
            if(result){
                const token = jwt.sign({course:"backend",userID:user[0]._id,role:user[0].role}, "NORMAL_KEY");
                const refresh_token = jwt.sign({course:"backend",userID:user[0]._id,role:user[0].role}, "REFRESH_KEY");

                res.cookie("token",token)
                res.cookie("refresh_token",refresh_token);
                res.send("login successfull")

            }else{
                res.send("wrong credentials")
            }
        })
       }else{
        res.send("invalid credentials")
       }

    } catch (error) {
        res.send("Error while logging the user")
        console.log(error)
    }
})
userrouter.get("/gettoken",(req,res)=>{
    const refresh_token=req.cookies.refresh_token
    if(!refresh_token){
        res.send("refresh token not present")
    }

    jwt.verify(refresh_token,'REFRESH_SECRET',(err,decoded)=>{
        if(err){
            res.send("refresh token not verified")
        }else {
            console.log(decoded);
            const token = jwt.sign({course:"backend",userID:decoded.userID}, "NORMAL_KEY");
            res.cookie("token",token)
            res.send("login successfull")
        }
    })
})

userrouter.get("/logout",(req,res)=>{
    const token= req.cookies.token;
    const blacklistdata= JSON.parse(fs.readFileSync("./blacklist.json","utf8"))
    blacklistdata.push(token);
    fs.writeFileSync("./blacklist.json",JSON.stringify(blacklistdata))
    res.send("logged out successfully")
})

module.exports={
    userrouter
}

// {
//     "name":"nikhil kumar",
//     "email":"nikhil@gmail.com",
//     "pass":"nikhil",
//     "age":26,
//     "role":"manager"
//   }