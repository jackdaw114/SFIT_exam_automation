const mongoose = require('mongoose');

const SyllabusSchema = mongoose.Schema(
    {
        year: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true,
        },
        semester: {
            type: Number,
            reauired: true,
        },
        subjects: {
            type: Array,
        }

    }
)

module.exports = mongoose.model('Student', SyllabusSchema);