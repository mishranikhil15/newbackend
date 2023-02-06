const express= require("express");

const{GoldModel}= require("../model/golmodel")

const{ UserModel}= require("../model/usermodel")



const bcrypt= require("bcrypt");

const jwt = require("jsonwebtoken")

const{authorise}=require("../middleware/authorise")

const goldrouter= express.Router()


goldrouter.get("/goldrate",async(req,res)=>{
    const data= await UserModel.find()
    res.send(data)
})

goldrouter.get("/userstats",authorise(["manager"]),(req,res)=>{
    res.send("my role is manager")
})

module.exports={
    goldrouter
}
