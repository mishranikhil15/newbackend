const mongoose =require("mongoose")

const UserSchema= mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number,
    role:String
})

const UserModel= mongoose.model("user",UserSchema)

module.exports={
    UserModel
}