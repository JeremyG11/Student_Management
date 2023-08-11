const express = require("express");
const router = express.Router();

const lessonControllers = require("../controllers/lessonControllers");
const exerciseControllers = require("../controllers/erollmentController");


router.post("/create", lessonControllers.createLesson);
// router.get("/", lessonControllers);
router.get("/:lessonId", lessonControllers.getLessonById);
router.put("/update/:lessonId", lessonControllers.updateLesson);
router.delete("/delete/:lessonId", lessonControllers.deleteLesson);

module.exports = router;
