const express = require('express');
const router = express.Router();

const { addCourse } = require('../controllers/courseController')

router.post('/add', addCourse)

module.exports = router;