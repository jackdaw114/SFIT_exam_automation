
const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema(
    {
        branch_id: {
            type: String,
            required: true,
            unique: true
        },
        branch_name: {
            type: String,
            required: true
        },

    }
)

module.exports = mongoose.model('Branch', BranchSchema);