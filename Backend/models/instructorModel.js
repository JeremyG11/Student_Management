const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
    },
    courses_taught: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],
}, { timestamps: true });

module.exports = mongoose.model("Instructor", instructorSchema);
