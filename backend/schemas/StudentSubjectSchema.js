const mongoose = require('mongoose');

// Define a Mongoose schema for student subject selection
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

// Define a Mongoose model based on the schema
const StudentSubject = mongoose.model('StudentSubject', studentSubjectSchema);

module.exports = StudentSubject;