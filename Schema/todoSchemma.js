var mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    data:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
})

var todo = mongoose.model('todo',todoSchema)
module.exports = todo