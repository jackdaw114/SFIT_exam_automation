const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        Name: {
            type: String
        },

    }
)

module.exports = mongoose.model('Student', StudentSchema );