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
        }

    }
)

module.exports = mongoose.model('Student', StudentSchema);