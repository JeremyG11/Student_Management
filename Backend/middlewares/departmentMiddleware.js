const Department = require('../models/departmentsModel')
const asyncHandler = require('express-async-handler')

const departmentById = asyncHandler(async(req, res, next, id)=>{

    try{
        let enrolledDepartment = await Department.findById(id)
        if(!enrolledDepartment){
            return res.status(404).json({
                error: 'Department not found',
            })
        }else{
            req.department = enrolledDepartment
        }
        next()
    }catch(error){
        res.status(400).json({
            error: error.message,
        })

    }
})

 
module.exports = {
    departmentById,
}