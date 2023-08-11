const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// Create a new enrollment
const createNewEnrollment = asyncHandler(async (req, res) => {
    const { courses } = req.body;
    
    // Validate course IDs
    const validCourseIds = courses.every(courseId => mongoose.Types.ObjectId.isValid(courseId));
    if (!validCourseIds) {
        return res.status(400).json({ error: 'Invalid course IDs, Please check courses IDs' });
    }

    // Create a new enrollment document
    const enrollment = new Enrollment({
        student: req.user._id,  
        courses: courses,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const createdEnrollment = await enrollment.save({ session });

        // Update the enrolled courses with the enrollment ID
        await Course.updateMany(
            { _id: { $in: courses } },
            { $addToSet: { enrollments: createdEnrollment._id } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ enrollment: createdEnrollment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create enrollment' });
    }
});

// Add courses to an existing enrollment
const addCourseToEnrollment = asyncHandler(async (req, res) => {
    const { courses } = req.body;
    const enrollmentId = req.params.enrollmentId;

    // Validate course IDs
    const validCourseIds = courses.every(courseId => mongoose.Types.ObjectId.isValid(courseId));
    if (!validCourseIds) {
        return res.status(400).json({ error: 'Invalid course IDs' });
    }

    try {
        const enrollment = await Enrollment.findById(enrollmentId);

        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        const updatedEnrollment = await Enrollment.findByIdAndUpdate(
            enrollmentId,
            { $addToSet: { courses: courses } },
            { new: true, session }
        );

        // Update the enrolled courses with the enrollment ID
        await Course.updateMany(
            { _id: { $in: courses } },
            { $addToSet: { enrollments: enrollmentId } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ enrollment: updatedEnrollment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add courses to enrollment' });
    }
});

module.exports = {
    createNewEnrollment,
    addCourseToEnrollment,
};
