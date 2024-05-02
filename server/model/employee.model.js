const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String, required:true, unique:true},
    salary:{type:Number, default:0},
    date:{type:Date, default:Date.now()},
    userId:{type:String,required:true},
    department:{type:String, enum:["marketing","tech", "operations"], required:true}
},{
    versionKey:false
})

const EmployeeModel = mongoose.model("employees",employeeSchema);

module.exports={EmployeeModel}