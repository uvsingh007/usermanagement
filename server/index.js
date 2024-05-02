const express = require('express');
const cors = require('cors');
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { employeeRouter } = require("./routes/employee.route");
require("dotenv").config();
const app = express();

app.use(express.json(),cors());
app.use("/user",userRouter);
app.use("/employee",employeeRouter)

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