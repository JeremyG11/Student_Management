
const asyncHandler = require('express-async-handler')
const Course = require('../models/cousesModel')
const User = require('../models/userModel')
const Department = require('../models/departmentsModel')

// Add a course
// @ENDPOINT /api/courses/add
// method: POST
const addCourse = asyncHandler( async (req, res) =>{
    const { course_name, course_code, course_dept, credit } = req.body

    const department = await Department.findOne({course_dept})

    if(!course_name || !course_code || !department){
        res.status(400)
        throw new Error('Course should have a name and code')
    }
    
    try {
        console.log(department)
        const course = await Course.create({
            course_name,
            course_code,
            course_dept:department._id,
            credit
        })
        department.courses.push(course)
        department.save()
     
        res.status(201).json({
            data:course
        })
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// Get all the courses 
// @ENDPOINT /api/courses
// method: GET
const getCourses = asyncHandler( async (req, res)=>{
    const courses = await Course.find({})
    res.status(200).json({
        data: courses
    })
})

const getCourse = asyncHandler( async (req, res)=>{
    const course = await Course.findById(req.params.course_code);
    if (!course) {
        res.status(404)
        throw new Error('Course not found')
    }else{
        res.json({
            data:course
        })
    }
  
})


// Update a course
// @ENDPOINT /api/courses/update/:course_code
// method: PUT
const updateCourse = asyncHandler( async (req, res)=>{
    const course = await Course.findById(req.params.course_code)
    if(!course){
        res.status(404)
            throw new Error("Couldn't be updated, Course not found")
    }
    const updatedCourse = await findByIdAndUpdate(
        req.params.course_code, req.body, { new:true }
    ).res.status(200).json({ 
        data:updatedCourse,
        message: 'Course has been updated successfully'
    })
  
})

// Delete a course
// @ENDPOINT /api/courses/delete/:course_code
// method: DELETE
const deleteCourse = asyncHandler( async (req, res)=>{
    const deletedCourse = await findByIdAndDelete(req.params.course_code)
    if (!deletedCourse){
        res.status(404)
        throw new Error("Couldn't be deleted, Course not found")
    }else{
        res.status(200).json({
            data:deletedCourse,
            message: "Course has been deleted successfully"
        })
    }
    
})


module.exports = {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
}