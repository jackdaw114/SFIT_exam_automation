const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        subjects: {
            type: Array,
        }

    }
)

module.exports = mongoose.model('Teacher', TeacherSchema);