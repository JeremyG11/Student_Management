const express = require('express')
const router = express.Router()

const { protector } = require('../middlewares/authMiddleware')
const { createEnrollment, addCourseToEnrollment } = require('../controllers/erollmentController')
const { findEnrollment, enrollmentById } = require('../middlewares/enrollmentMiddlewares')
const { departmentById } = require('../middlewares/departmentMiddleware')
const { courseById } = require('../middlewares/courseMiddlewares')


router.post('/new/:departmentId', protector, findEnrollment, createEnrollment)
router.post('/:enrollmentId', protector, addCourseToEnrollment)

router.param('departmentId', departmentById)
router.param('enrollmentId', enrollmentById)
router.param('courseId', courseById)

module.exports = router