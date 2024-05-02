const express = require("express");
const { EmployeeModel } = require("../model/employee.model");
const { auth } = require("../middleware/auth.middleware");
const employeeRouter = express.Router();


employeeRouter.get("/", auth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const department = req.query.department;
    const searchName = req.query.searchName;
    const sortBy = req.query.sortBy || "salary";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    const filter = { userId: req.userId };
    if (department) filter.department = department;
    if (searchName) filter.first_name = { $regex: searchName, $options: "i" };

    try {
        const count = await EmployeeModel.countDocuments(filter);
        const totalPages = Math.ceil(count / limit);
        const employees = await EmployeeModel.find(filter).sort({ [sortBy]: sortOrder }).skip((page - 1) * limit).limit(limit);
        res.status(200).send({ employees, totalPages, currentPage: page });
    } catch (err) {
        console.log(err);
        res.status(500).send({ Error: "Error occurred while fetching employees" });
    }
});


// employeeRouter.get("/",auth,async(req,res)=>{
//     try{
//         const employees = await EmployeeModel.find({userId:req?.userId});
//         res.status(200).send({
//             msg:"list of employees",
//             employees
//         })
//     }
//     catch(err){
//         res.status(500).send({
//             msg:"error occured",
//             err
//         })
//     }
// })

// employeeRouter.get("/search?",auth,async(req,res)=>{
//     try{
//         const employee = await EmployeeModel.find(req.query);
//         res.status(200).send({
//             msg:"list of employees",
//             employees
//         })
//     }
//     catch(err){
//         res.status(500).send({
//             msg:"error occured",
//             err
//         })
//     }
// })

employeeRouter.post("/",auth,async(req,res)=>{
    try{
        const {firstName,lastName, salary,department,email} = req.body;
        const employee = new EmployeeModel({firstName,lastName,salary,department,email,userId:req.userId})
        await employee.save();
        res.status(200).send({
            msg:"new employee added",
            employee
        })
    }
    catch(err){
        res.status(500).send({
            msg:"error occured",
            err
        })
    }
})

employeeRouter.patch("/:id",auth,async(req,res)=>{
    try{
        const employee = await EmployeeModel.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send({
            msg:"user updated succcessfully",
            employee
        })
    }
    catch(err){
        res.status(500).send({
            msg:"error occured",
            err
        })
    }
})

employeeRouter.delete("/:id",auth,async(req,res)=>{
    try{
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            msg:"user deleted succcessfully",
            employee
        })
    }
    catch(err){
        res.status(500).send({
            msg:"error occured",
            err
        })
    }
})



module.exports={
    employeeRouter
}