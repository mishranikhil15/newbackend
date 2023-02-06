const jwt = require("jsonwebtoken")

const fs=require("fs")

const authenticate=(req,res,next)=>{
    const token=req.cookies.token;
    const blacklistdata= JSON.parse(fs.readFileSync("./blacklist.json","utf8"))
    if(blacklistdata.includes(token)){
        return res.send("login again & token present")
    }

    try {
        if(token){
            const decoded=jwt.verify(token,"NORMAL_KEY")
            console.log(decoded)
            const userID= decoded.userID;
            const userrole=decoded?.role
            console.log(useerole)
            if(decocded){
                req.body.userID=userID
                req.body.useerole=userrole
                next();
            }else{
                res.send("please login first")
            }
        }else{
            res.send("login failed")
        }
    } catch (error) {
        console.log(error.message)
        res.send({"message":"please login again","err":error.message})
    }
}


module.exports={
    authenticate
}