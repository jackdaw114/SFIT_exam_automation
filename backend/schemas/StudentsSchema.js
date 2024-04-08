const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        pid: {
            type: Number,
            required: true,
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

        }

    }, { strict: false }
)

// TODO: implement class (A/B)


module.exports = mongoose.model('Student', StudentSchema);