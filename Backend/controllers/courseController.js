const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

const createCourse = asyncHandler(async (req, res) => {
  const {
    course_name,
    course_code,
    courseDepartment,
    creditHours,
    course_instructor,
  } = req.body;

  try {
    const course = await Course.create({
      course_name,
      course_code,
      courseDepartment,
      creditHours,
      course_instructor,
    });
    res
      .status(201)
      .json({ data: course, message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find({}).populate(
      "courseDepartment",
      "departmentName"
    );
    res.status(200).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getCourseById = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId)
      .populate("courseDepartment", "departmentName")
      .populate("course_instructor", "instructor_name")
      .populate("lessons", "title description");

    if (!course) {
      res.status(404).json({ message: "Course not found" });
    } else {
      res.status(200).json({ data: course });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateCourseById = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      res.status(404).json({ message: "Course not found" });
    } else {
      res
        .status(200)
        .json({ data: updatedCourse, message: "Course updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteCourseById = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      res.status(404).json({ message: "Course not found" });
    } else {
      res
        .status(200)
        .json({ data: deletedCourse, message: "Course deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
