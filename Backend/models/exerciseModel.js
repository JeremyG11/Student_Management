const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  instructions: { type: String },
  hints: [{ type: String }],
  solution: { type: String },
  // You can add more fields specific to exercises here
});

module.exports = mongoose.model("Exercise", exerciseSchema);
