const mongoose = require('mongoose');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel'); 

const enrollmentSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',  
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', 
        required: true,
    },
    enrolled_at: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed'],
        default: 'pending',
    },
    grade: {
        type: Number,
        min: 0,
        max: 100,
        default:null
    },
    completion_date: {
        type: Date,
    },
     
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
