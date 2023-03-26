const Course = require('../models/courseModel')
const asyncHandler = require('express-async-handler')

const courseById = asyncHandler(async(req, res, next, id)=>{

    try{
        let course = await Course.findById(id)
        if(!course){
            return res.status(404).json({
                error: 'Department not found',
            })
        }else{
            req.course = course
        }
        next()
    }catch(error){
        res.status(400).json({
            error: error.message,
        })

    }
})

 
module.exports = {
    courseById,
}