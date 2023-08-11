const Exercise = require("../models/exerciseModel");
const asyncHandler = require("express-async-handler");

// Create a new exercise
const createExercise = asyncHandler(async (req, res) => {
  try {
    const { description, instructions, hints, solution } = req.body;

    const newExercise = await Exercise.create({
      description,
      instructions,
      hints,
      solution,
    });

    res.status(201).json({ exercise: newExercise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single exercise by ID
const getExerciseById = asyncHandler(async (req, res) => {
  try {
    const exerciseId = req.params.id;

    const exercise = await Exercise.findById(exerciseId);

    if (!exercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }

    res.status(200).json({ exercise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an exercise by ID
const updateExercise = asyncHandler(async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const { description, instructions, hints, solution } = req.body;

    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      {
        description,
        instructions,
        hints,
        solution,
      },
      { new: true }
    );

    if (!updatedExercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }

    res.status(200).json({ exercise: updatedExercise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an exercise by ID
const deleteExercise = asyncHandler(async (req, res) => {
  try {
    const exerciseId = req.params.id;

    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);

    if (!deletedExercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }

    res.status(200).json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createExercise,
  getExerciseById,
  updateExercise,
  deleteExercise,
};
