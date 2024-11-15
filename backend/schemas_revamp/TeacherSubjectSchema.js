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
        iat: Boolean,
        ese: Boolean,
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
                type: Number,
                default: 0,
            },

            oral: {
                type: Number,
                default: 0,
            },

            practical: {
                type: Number,
                default: 0,
            },
            iat: {
                type: Number,
                default: 0,
            },
            ese: {
                type: Number,
                default: 0,
            }
        }
    }
)

module.exports = mongoose.model('TeacherSubject', TeacherSubjectSchema);