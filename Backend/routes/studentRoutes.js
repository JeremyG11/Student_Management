const express = require("express");
const router = express.Router();

const studentControllers = require("../controllers/studentController");


router.post("/register", studentControllers.registerStudent);
// router.post("/login", studentControllers);
router.put("/update/:id", studentControllers.updateStudent);
router.delete("/delete/:id", studentControllers.deleteStudent);

router.get("/", studentControllers.getAllStudents);
router.get("/:id", studentControllers.getStudentById);

module.exports = router;
