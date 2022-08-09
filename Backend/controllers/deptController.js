const asyncHandler = require('express-async-handler')
const Department = require('../models/departmentsModel')
const Course = require('../models/cousesModel')
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

module.exports = {
    createDept,
    getDepartments
}