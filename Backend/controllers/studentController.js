const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../models/studentModel");
const mongoose = require("mongoose");

// Create a new student
const registerStudent = asyncHandler(async (req, res) => {
  const {
    registration_id,
    first_name,
    last_name,
    email,
    password,
    date_of_birth,
    gender,
    departmentId,
  } = req.body;

  const existingStudent = await Student.findOne({
    $or: [{ email }, { registration_id }],
  });

  if (existingStudent) {
    return res.status(400).json({
      error: "Student with the same email or student ID already exists",
    });
  }

  try {
    const student = await Student.create({
      registration_id,
      first_name,
      last_name,
      email,
      date_of_birth,
      gender,
      password,
      department: departmentId,
      gender: req.body?.gender,
      courses_enrolled: req.body?.courses_enrolled,
    });

    res.status(201).json({
      registration_id: student.registration_id,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      date_of_birth: student.date_of_birth,
      gender: student.gender,
      department: student.department,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve students" });
  }
});

// Get a specific student by ID
const getStudentById = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId).select("-password");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student details by ID
const updateStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const updateFields = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateFields,
      { new: true }
    ).select("-password");
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete student by ID
const deleteStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Function to generate Token for a user
const generateToken = (id, roles) => {
  return jwt.sign(
    {
      user: {
        id,
        roles,
      },
    },
    process.env.SECRET_JWT,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  registerStudent,

  getAllStudents,
  getStudentById,

  deleteStudent,
  updateStudent,
};
