const asyncHandler = require('express-async-handler')
const Enrollment = require('../models/enrollmentModel')

const findEnrollment = asyncHandler(async (req, res, next) => {
    
    try {
    
        let enrollments =  await Enrollment.find({
            department:req.department._id,
            student:req.user._id,
        })
        if(enrollments.length == 0){
            next()
        }else{
            res.json(enrollments[0])
        }
        
    } catch (error) {
        return res.status(400).json({
            error:error.error,

        })
    }
})
const enrollmentById = asyncHandler(async(req, res, next ,id)=>{
    
    try {
        const enrollment = await Enrollment.findById(id).populate('student', '_id name')
        if(!enrollment){
            res.status(400).json({
                message: 'Enrollment not found'
            })
        }
        req.enrollment = enrollment
        
        next()
    } catch (error) {
        res.status(400).json(
            error
        )
    }
})

module.exports= {
    findEnrollment,
    enrollmentById,
}