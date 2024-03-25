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
        email: {
            type: String,
            required: true
        },
        phoneNo: {
            type: Number,
        },
        subjects: {
            type: Array,
        }

    }
)

module.exports = mongoose.model('Teacher', TeacherSchema);