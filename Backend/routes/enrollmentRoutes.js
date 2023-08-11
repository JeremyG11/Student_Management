const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/erollmentController");

router.post(
  "/new-enrollment/:departmentId",
  enrollmentController.createNewEnrollment
);
router.post(
  "/add-cousrse-enrollment/:enrollmentId",
  enrollmentController.addCourseToEnrollment
);

module.exports = router;
