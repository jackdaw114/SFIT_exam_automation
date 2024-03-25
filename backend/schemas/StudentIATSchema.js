const mongoose = require('mongoose');

const StudentIATSchema = mongoose.Schema(
    {
        Name: {
            type: String
        },
        Q1: Number,
        Q2: Number,
        Q3: Number,
        Total: Number,


    }
)

module.exports = mongoose.model('StudentIAT', StudentIATSchema);