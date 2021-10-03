const mongoose = require("mongoose");

const markSchema = mongoose.Schema({
    usn: {
        type: String
    },
    percentage: {
        type: String
    },
    cgpa: {
        type: String
    },
    sgpa: {
        type: String
    },
    subject: {
        type: Array
    },
    sem: {
        type: String
    },
    branch: {
        type: String
    }
})

const Mark = mongoose.model('Mark', markSchema);

module.exports = { Mark };