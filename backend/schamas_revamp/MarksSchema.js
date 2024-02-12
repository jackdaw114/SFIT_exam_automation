//snakecase (no capitals, "_" delimiter)


const mongoose = require('mongoose');

const MarksSchema = mongoose.Schema(
    {
        student_id: {
            type: Number,
            required: true,
            ref: 'Student',
        },
        subject_code: {
            type: String,
            required: true,
            ref: 'Subject'
        },
        marks: {
            type: Number,
        },
        createdAt: {
            type: Date,
            default: Date.now // Set the default value to the current date/time
        }

    }
)

module.exports = mongoose.model('Marks', MarksSchema);