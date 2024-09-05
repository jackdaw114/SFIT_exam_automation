const mongoose = require('mongoose');

const studentSubjectSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true
    },
    subjects: [{
        type: String,
        required: true
    }]
});

const StudentSubject = mongoose.model('StudentSubject', studentSubjectSchema);

module.exports = StudentSubject;