const User = require('../models/userModel')
const Course = require('../models/cousesModel')

// Add a course controller

const addCourse = ( async (req, res) =>{
    const { course_name, course_code, course_dept } = req.body

    if(!course_name || !course_code){
        res.status(400)
        throw new Error('Course should have a name and code')
    }
    
    try {
        const course = await Course.create({
            course_name,
            course_code,
            course_dept:req.params.course_dept,

        })
        res.status(201).json({
            data:course
        })
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = {
    addCourse,
}