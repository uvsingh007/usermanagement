require("dotenv").config();
const express = require('express');
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { employeeRouter } = require("./routes/employee.route");

const app = express();

app.use(cors(),express.json());

app.get("/",async(req,res)=>{
    try{
        res.status(200).send({
            msg:"welcome to homepage"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            msg:"error occured"
        })
    }
})

app.use("/user",userRouter);
app.use("/employee",employeeRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("db connected");
        console.log(`server running on port ${process.env.port}`);
    }
    catch(err){
        console.log(err);
    }
})