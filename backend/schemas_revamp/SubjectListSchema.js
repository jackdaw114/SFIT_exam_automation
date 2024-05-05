//snakecase (no capitals, "_" delimiter)


const mongoose = require('mongoose');

const SubjectListschema = mongoose.Schema(
    {
        subject_ids: [{
            type: String,
        }],
        branch: {
            type: String,
        },
        semester: {
            type: String,
        }


    }
)

module.exports = mongoose.model('SubjectList', SubjectListschema);