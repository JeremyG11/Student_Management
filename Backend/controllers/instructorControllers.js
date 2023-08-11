const Instructor = require("../models/instructorModel");
const asyncHandler = require("express-async-handler");

// Create a new instructor
const createInstructor = asyncHandler(async (req, res) => {
  try {
    const { first_name, last_name, email, bio, courses_taught } = req.body;

    const newInstructor = await Instructor.create({
      first_name,
      last_name,
      email,
      bio,
      courses_taught,
    });

    res.status(201).json({ instructor: newInstructor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single instructor by ID
const getInstructorById = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.params.id;

    const instructor = await Instructor.findById(instructorId).populate(
      "courses_taught",
      "course_name"
    );

    if (!instructor) {
      res.status(404).json({ error: "Instructor not found" });
      return;
    }

    res.status(200).json({ instructor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an instructor by ID
const updateInstructor = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.params.id;
    const { first_name, last_name, email, bio, courses_taught } = req.body;

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructorId,
      {
        first_name,
        last_name,
        email,
        bio,
        courses_taught,
      },
      { new: true }
    ).populate("courses_taught", "course_name");

    if (!updatedInstructor) {
      res.status(404).json({ error: "Instructor not found" });
      return;
    }

    res.status(200).json({ instructor: updatedInstructor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an instructor by ID
const deleteInstructor = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.params.id;

    const deletedInstructor = await Instructor.findByIdAndDelete(instructorId);

    if (!deletedInstructor) {
      res.status(404).json({ error: "Instructor not found" });
      return;
    }

    res.status(200).json({ message: "Instructor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createInstructor,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
};
