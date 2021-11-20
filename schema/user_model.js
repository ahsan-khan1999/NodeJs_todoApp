var mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

var user = mongoose.model('user', user_schema)
module.exports = user
