const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
    },
    course_code: {
      type: String,
      required: true,
      unique: true,
    },
    courseDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    creditHours: {
      type: String,
      required: true,
    },
    course_instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    complete: {
      type: Boolean,
      default: false,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
