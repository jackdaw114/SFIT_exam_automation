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
        subject: {
            type: String,
            required: true,
        }

    }
)

module.exports = mongoose.model('Teacher', TeacherSchema);