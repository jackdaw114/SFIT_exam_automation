const mongoose = require('mongoose');

const MarksSchema = mongoose.Schema(
    {
        marks_type,
        teacher_name,
        sheet_name,
        sheet
    }
)

module.exports = mongoose.model('Marks', MarksSchema);