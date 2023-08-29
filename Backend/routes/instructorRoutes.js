const express = require("express");
const router = express.Router();

const instructorController = require("../controllers/instructorControllers");

router.post("/register", instructorController.createInstructor);
// router.post("/login", instructorController);
router.put("/update/:id", instructorController.updateInstructor);
router.delete("/delete/:id", instructorController.deleteInstructor);

router.get("/", instructorController.getAllInstructors);
router.get("/:id", instructorController.getInstructorById);

module.exports = router;
