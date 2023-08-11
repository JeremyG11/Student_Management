const Lesson = require("../models/lessonModel");
const asyncHandler = require("express-async-handler");

// Create a new lesson
const createLesson = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      duration,
      videoUrl,
      resources,
      exercises,
      prerequisites,
      quiz,
    } = req.body;

    const newLesson = await Lesson.create({
      title,
      description,
      content,
      duration,
      videoUrl,
      resources,
      exercises,
      prerequisites,
      quiz,
    });

    res.status(201).json({ lesson: newLesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getAllLesson = asyncHandler(async (req, res) => {
  try {
    const lessonId = req.params.id;

    const lesson = await Lesson.findById(lessonId)
      .populate("exercises", "title")
      .populate("prerequisites", "title")
      .populate("quiz", "title");

    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single lesson by ID
const getLessonById = asyncHandler(async (req, res) => {
  try {
    const lessonId = req.params.id;

    const lesson = await Lesson.findById(lessonId)
      .populate("exercises", "title")
      .populate("prerequisites", "title")
      .populate("quiz", "title");

    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a lesson by ID
const updateLesson = asyncHandler(async (req, res) => {
  try {
    const lessonId = req.params.id;
    const {
      title,
      description,
      content,
      duration,
      videoUrl,
      resources,
      exercises,
      prerequisites,
      quiz,
    } = req.body;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      {
        title,
        description,
        content,
        duration,
        videoUrl,
        resources,
        exercises,
        prerequisites,
        quiz,
      },
      { new: true }
    )
      .populate("exercises", "title")
      .populate("prerequisites", "title")
      .populate("quiz", "title");

    if (!updatedLesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.status(200).json({ lesson: updatedLesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a lesson by ID
const deleteLesson = asyncHandler(async (req, res) => {
  try {
    const lessonId = req.params.id;
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.status(200).json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createLesson,
  getAllLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
};
