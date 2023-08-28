const mongoose = require('mongoose');

const MarksSchema = mongoose.Schema(
    {
        marks_type: String,
        teacher_name: String,
        sheet: String
    }
)

module.exports = mongoose.model('Marks', MarksSchema);