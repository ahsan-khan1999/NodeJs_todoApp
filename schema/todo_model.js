var mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

var todo = mongoose.model('todo', todoSchema)
module.exports = todo
