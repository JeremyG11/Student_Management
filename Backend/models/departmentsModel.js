const mongoose = require("mongoose");
const Course = require("../models/courseModel");

const departmentSchema = mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    head_of_department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

departmentSchema.pre("remove", async function (next) {
  const department = this;
  await Course.deleteMany({ course_dept: department._id });
  next();
});

module.exports = mongoose.model("Department", departmentSchema);
