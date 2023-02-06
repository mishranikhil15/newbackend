const mongoose =require("mongoose")

const GoldSchema= mongoose.Schema({
    name:String,
    price:Number,
    UserID:String
})

const GoldModel= mongoose.model("rate",GoldSchema)

module.exports={
    GoldModel
}