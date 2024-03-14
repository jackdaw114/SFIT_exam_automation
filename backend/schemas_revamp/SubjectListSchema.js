//snakecase (no capitals, "_" delimiter)


const mongoose = require('mongoose');

const SubjectListschema = mongoose.Schema( //TODO: implement schema 
    {
        subject_id: {
            type: String,
            required: true,
            unique: true
        },
        subject_name: {
            type: String,
            required: true
        },
        teacher_id: {
            type: String,
            required: true,

        }

    }
)

module.exports = mongoose.model('SubjectList', SubjectListschema);