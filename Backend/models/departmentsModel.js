const mongoose = require('mongoose')
const Course = require('../models/courseModel')

const departmentSchema = mongoose.Schema({
    dept_name: {
        type: String,
        require:true,
        unique: true,
    },
    courses: [
                 
         ]
    
}, {timestamps:true})

module.exports = mongoose.model('Department', departmentSchema)

departmentSchema.pre('remove', async(next) => {
    const department = this
    await Course.deleteMany({course_dept:department._id})
    next()
})