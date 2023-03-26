const express = require('express');
const router = express.Router();

const { courseById } = require('../middlewares/courseMiddlewares')
const { addCourse, getCourses, getCourse, updateCourse, deleteCourse } = require('../controllers/courseController')

router.get('/', getCourses)
router.post('/add', addCourse)
router.get('/:course_code', getCourse)
router.put('/update/:course_code', updateCourse)
router.delete('/delete/:course_code', deleteCourse)

router.param('courseId', courseById)

module.exports = router;