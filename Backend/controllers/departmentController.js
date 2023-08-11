const asyncHandler = require("express-async-handler");
const Department = require("../models/departmentsModel");
const Course = require("../models/courseModel");

const createDepartment = asyncHandler(async (req, res) => {
  const { departmentName, description, head_of_department, location } =
    req.body;

  if (!departmentName) {
    res.status(400).json({ message: "Department must have a name" });
    return;
  }

  try {
    const department = await Department.create({
      departmentName,
      description,
      head_of_department,
      location,
    });
    res
      .status(201)
      .json({ data: department, message: "Department created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getAllDepartments = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.find({});
    res.status(200).json({ data: departments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const departmentId = req.params.departmentId;

  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      res.status(404).json({ message: "Department not found" });
    } else {
      res.status(200).json({ data: department });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateDepartmentById = asyncHandler(async (req, res) => {
  const departmentId = req.params.departmentId;

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      req.body,
      { new: true }
    );
    if (!updatedDepartment) {
      res.status(404).json({ message: "Department not found" });
    } else {
      res.status(200).json({
        data: updatedDepartment,
        message: "Department updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteDepartmentById = asyncHandler(async (req, res) => {
  const departmentId = req.params.departmentId;

  try {
    const deletedDepartment = await Department.findByIdAndDelete(departmentId);
    if (!deletedDepartment) {
      res.status(404).json({ message: "Department not found" });
    } else {
      res.status(200).json({
        data: deletedDepartment,
        message: "Department deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
