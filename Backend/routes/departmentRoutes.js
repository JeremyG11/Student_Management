const express = require("express");
const router = express.Router();

const departmentControllers = require("../controllers/departmentController");

router.post("/create", departmentControllers.createDepartment);
router.get("/", departmentControllers.getAllDepartments);
router.get("/:departmentId", departmentControllers.getDepartmentById);
router.put("/update/:departmentId", departmentControllers.updateDepartmentById);
router.delete(
  "/delete/:departmentId",
  departmentControllers.deleteDepartmentById
);

module.exports = router;
