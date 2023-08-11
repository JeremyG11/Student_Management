const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  content: { type: String },
  duration: { type: Number },
  videoUrl: { type: String },
  resources: [{ type: String }],
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],

  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
});

lessonSchema.pre("remove", async function (next) {
  try {
    await mongoose
      .model("Exercise")
      .deleteMany({ _id: { $in: this.exercises } });

    if (this.quiz) {
      await mongoose.model("Quiz").findByIdAndDelete(this.quiz);
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Lesson", lessonSchema);
