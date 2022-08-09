const Enrollment = require('../models/enrollmentModel')

const create = (req, res )=> {
    let { course, student } = req.body

    const newEnrollment = {
        course: req.course,
        student: req.student
    }
}