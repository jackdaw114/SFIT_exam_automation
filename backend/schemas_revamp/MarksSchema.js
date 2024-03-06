//snakecase (no capitals, "_" delimiter)


const mongoose = require('mongoose');

const MarksSchema = mongoose.Schema(
    {
        student_pid: {
            type: Number,
            required: true
        },
        marks_type: {
            type: String,
            required: true
        },
        subject_code: {
            type: String,
            required: true
        },
        marks: {
            type: Number,
            default: -8,
        },
        createdAt: {
            type: Date,
            default: Date.now // Set the default value to the current date/time
        },
        semester: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
        }

    }
)

module.exports = mongoose.model('Marks2', MarksSchema);