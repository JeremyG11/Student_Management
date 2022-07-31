const aysncHandler = require('express-async-handler')
const Department = require('../models/departmentsModel')

// Create a new department
const createDept = aysncHandler( async (req, res) => {

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

module.exports = {
    createDept,
}