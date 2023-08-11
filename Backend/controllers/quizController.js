const Quiz = require("../models/quizModel");
const asyncHandler = require("express-async-handler");

// Create a new quiz
const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, questions } = req.body;

  const newQuiz = await Quiz.create({
    title,
    description,
    questions,
    createdBy: req.user._id,
  });

  res.status(201).json({ quiz: newQuiz });
});

// Get a single quiz by ID
const getQuizById = asyncHandler(async (req, res) => {
  const quizId = req.params.id;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404).json({ error: "Quiz not found" });
    return;
  }

  res.status(200).json({ quiz });
});

// Update a quiz by ID
const updateQuiz = asyncHandler(async (req, res) => {
  const quizId = req.params.id;

  const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, {
    new: true,
  });

  if (!updatedQuiz) {
    res.status(404).json({ error: "Quiz not found" });
    return;
  }

  res.status(200).json({ quiz: updatedQuiz });
});

// Delete a quiz by ID
const deleteQuiz = asyncHandler(async (req, res) => {
  const quizId = req.params.id;

  const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

  if (!deletedQuiz) {
    res.status(404).json({ error: "Quiz not found" });
    return;
  }

  res.status(200).json({ message: "Quiz deleted" });
});

module.exports = {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
