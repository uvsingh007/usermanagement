const express= require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/signup",async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            bcrypt.hash(password,7,async(err,hash)=>{
                try{
                    if(hash){
                        const user = new UserModel({name,email,password:hash});
                        await user.save();
                        res.status(201).send({
                            msg:"user added",
                            user
                        })
                    }
                    else{
                        console.log(err);
                        res.status(501).send({
                            msg:"error while hashing",
                            err
                        })
                    }
                }
                catch(error){
                    console.log(error);
                    res.status(501).send({
                        msg:"error in bcrypt block",
                        error
                    })
                }
            })
        }
        else{
            res.status(100).send({
                msg:"user already exist please login"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            msg:"error occured",
            err
        })
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        console.log(user);
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    const accessToken = jwt.sign({userId:user._id},process.env.accessTokenSecret,{expiresIn:process.env.accessTokenLife});
                    const refreshToken = jwt.sign({userId:user._id},process.env.refreshTokenSecret,{expiresIn:process.env.refreshTokenLife});
                    res.status(201).send({
                        msg:"user loggedin",
                        accessToken,
                        refreshToken
                    })
                }
                else{
                    res.status(501).send({
                        msg:"Enter the correct password"
                    })
                }
            })
        }
        else{
            res.status(100).send({
                msg:"user does not exist. please register"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            msg:"error while logging in"
        })
    }
})
 
module.exports={
    userRouter
}