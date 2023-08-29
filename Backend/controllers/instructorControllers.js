const Instructor = require("../models/instructorModel");
const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../controllers/studentController");

const getUserByEmail = async (email) => {
  const [student, instructor] = await Promise.all([
    Student.findOne({ email }),
    Instructor.findOne({ email }),
  ]);

  if (instructor) {
    return instructor;
  }

  if (student) {
    return student;
  }

  return null;
};

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user && bcrypt.compare(user.password, password)) {
      res.status(200).json({
        user,
        token: generateToken(user._id, user.email),
      });
    } else {
      res.status(400);
      throw new Error("Couldn't login user with those credentials");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
const getAllInstructors = asyncHandler(async (req, res) => {
  try {
    const instructors = await Instructor.find({});

    res.status(200).json({ instructors });
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
  loginUser,
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
};
