const asyncHandler = require('express-async-handler')
const Department = require('../models/departmentsModel')
const Course = require('../models/courseModel')

// Create a new department
const createDept = asyncHandler( async (req, res) => {

    const { dept_name } = req.body

    if(!dept_name) {
        res.status(400)
        throw new Error('Department must have a name')
    }

    try {
        const department = await Department.create({
            dept_name
        })
        res.status(201).json({ 
            data:department,
            message: 'Department is created successfully'})
    } catch (error) {
        res.json({ error: error.message})
    }
})

// Query all  Departments
// @ENDPOINT /api/department
// method: GET
const getDepartment = asyncHandler( async (req, res) => {
    const department =  await Department.find({})
    if(!department) {
        res.status(404)
        throw new Error('No department exists yet')
    }else{
        res.status(200).json({ 
            data:department
        })
    }
})

// Query a specific Department
// @ENDPOINT /api/department/:dept_id
// method: GET
const getDepartments = asyncHandler( async (req, res) => {
    const department =  await Department.findById(req.params.departmentId)
    if(!department) {
        res.status(404)
        throw new Error('Could not found, No department with that id was found')
    }else{
        res.status(200).json({ data:{
             department
        }})
    }
})
// Update a Department
// @ENDPOINT /api/department/update/:dept_id
// method: PUT
const updateDepartment = asyncHandler(async(req,res)=>{
    const department = await Department.findById(req.params.dept_id)
    if(!department){
        res.status(404)
        throw new Error("Couldn't find that department")
    }
    const updatedDepartment = await Department.findByIdAndUpdate(
        req.params.dept_id,
        req.body,
        {new:true},
    )
    res.status(200).json({
        data:updatedDepartment,
        message: 'Department has been updated successfully'
    })

})
// Delete a Department
// @ENDPOINT /api/department/delete/:dept_id
// method: DELETE
const deleteDepartment = asyncHandler(async(req, res )=>{
    const department = await Department.findById(req.params.dept_id)
    if(!department){
        res.status(404)
        throw new Error("That department does not exist couldnt't be deleted")
    }else{
        res.status(200).json({
            data:department,
            message: "Department has been deleted successfully"
        })
    }
})

module.exports = {
    createDept,
    getDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
}