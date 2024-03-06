//snakecase (no capitals, "_" delimiter)


const mongoose = require('mongoose');

const TeacherSubjectSchema = mongoose.Schema(
    {
        subject_id: {
            type: String,
            required: true,
            ref: 'Subject'
        },
        teacher_id: {
            type: String,
            required: true
        },
        term: Boolean,
        oral: Boolean,
        practical: Boolean
    }
)

module.exports = mongoose.model('TeacherSubject', TeacherSubjectSchema);