const mongoose = require('mongoose');

const MarksSchema = mongoose.Schema(
    {
        marks_type: String,
        teacher_name: String,
        subject: {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject'
        },
        sheet: String,
        year: String
    }
)

module.exports = mongoose.model('Marks', MarksSchema);