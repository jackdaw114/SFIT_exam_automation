const mongoose = require('mongoose');

const MarksSchema = mongoose.Schema(
    {
        marks_type: String,
        teacher_name: String,
        subject: String,
        semester: Number,
        department: String,
        sheet: String,
        year: String
    }
)

module.exports = mongoose.model('Marks', MarksSchema);