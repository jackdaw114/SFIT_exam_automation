const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema(
    {
        pid: {
            type: Number,
            required: true
        },
        semester: {
            type: Number,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }

    }, { strict: false }
)

module.exports = mongoose.model('Report', ReportSchema);