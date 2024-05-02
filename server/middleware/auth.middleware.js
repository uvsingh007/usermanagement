const jwt =  require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
require("dotenv").config();

async function auth(req,res,next){
    try{
        const token =  req.headers.authorization?.split(" ")[1];
        // console.log(token);
        if(token){
            jwt.verify(token,process.env.accessTokenSecret, async(err,payload)=>{
                try{
                    if(payload){
                        const user = await UserModel.findById({_id:payload.userId});
                        req.userId=payload.userId
                        // console.log(payload.userId);
                        next();
                    }
                    else{
                        res.status(100).send({
                            msg:"token expired or incorrect token"
                        })
                    }
                }
                catch(err){
                    console.log(err);
                    res.status(100).send({
                        msg:"error while verifyying token"
                    })
                }
            })
        }
        else{
            res.status(501).send({
                msg:"please provide token"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            msg:"error while authorizing"
        })
    }
}

module.exports={
    auth
}