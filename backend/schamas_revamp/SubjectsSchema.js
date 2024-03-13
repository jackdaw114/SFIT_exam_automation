//snakecase (no capitals, "_" delimiter)


const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema(
    {
        subject_id: {
            type: String,
            required: true,
            unique: true
        },
        subject_name: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true,

        },
        semester: {
            type: Number,
        }

    }
)

module.exports = mongoose.model('Subject', SubjectSchema);