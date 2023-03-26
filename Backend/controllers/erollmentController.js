const Enrollment = require('../models/enrollmentModel')
const asyncHandler = require('express-async-handler')


const createEnrollment = asyncHandler(async(req, res )=> {
    const { courses } =  req.body
    const newEnrollment = {
        department: req.department,
        student: req.user,
        courses:[]
    }
    const enrollment = new Enrollment(newEnrollment)
    
    try {
         await Enrollment.findByIdAndUpdate(
            enrollment._id,
            {
                $addToSet:{
                    courses:courses
                },
            },
            {new:true}

        ).exec()
        let result = await enrollment.save()
        res.status(200).json({
            Enrollment:result
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
})

const addCourseToEnrollment = asyncHandler(async (req, res) => {
    
    const { courses } = req.body
    try {
        const result = await Enrollment.findByIdAndUpdate(
            req.params.enrollmentId,
            {
                $addToSet:{
                    courses:courses
                },
            },
            {new:true}

        ).exec()

        res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({
        error: err
        })
    }
})

module.exports = {
    createEnrollment,
    addCourseToEnrollment

}