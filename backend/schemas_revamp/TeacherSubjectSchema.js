//snakecase (no capitals, "_" delimiter)


const mongoose = require('mongoose');

const TeacherSubjectSchema = mongoose.Schema(
    {
        subject_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Subject'
        },
        teacher_id: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        term: Boolean,
        oral: Boolean,
        practical: Boolean,
        verified: {
            type: Number,
            default: 0
        },
        time: {
            type: Date,
            default: Date.now()
        }
        ,
        created: {
            term: {
                type: Boolean,
                default: false,
            },

            oral: {
                type: Boolean,
                default: false,
            },

            practical: {
                type: Boolean,
                default: false,
            }
        }
    }
)

module.exports = mongoose.model('TeacherSubject', TeacherSubjectSchema);