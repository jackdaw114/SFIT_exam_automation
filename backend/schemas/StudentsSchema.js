const mongoose = require('mongoose');

const StudentsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        pid: {
            type: Number,
            required: true,
            unique: true
        },
        branch: {
            type: String,
            required: true,
        },
        semester: {
            type: Number,
            required: true,
        },

        last_updated: {
            type: Date,
            default: Date.now
        },
        subject_ids: [{
            type: String,
        }],
        class:
        {
            type: String,

        },
        enrollment_year: {
            type: Number
        }
    }, { strict: false }
)


module.exports = mongoose.model('Student', StudentsSchema);