const mongoose = require('mongoose');

const MarksSchema = mongoose.Schema(
    {
        marks_type: String,
        teacher_name: String,
        subject: String,
        semester: String,
        department: String,
        sheet: String
    }
)

module.exports = mongoose.model('Marks', MarksSchema);