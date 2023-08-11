const express = require("express");
const router = express.Router();

const courseControllers = require("../controllers/courseController");

router.get("/", courseControllers.getAllCourses);
router.post("/add", courseControllers.createCourse);
router.get("/:courseId", courseControllers.getCourseById);
router.put("/update/:courseId", courseControllers.updateCourseById);
router.delete("/delete/:courseId", courseControllers.deleteCourseById);

module.exports = router;
