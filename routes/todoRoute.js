var express = require('express')
var bodyParser = require('body-parser')
var Todo = require('../Schema/todoSchemma')
var router= express.Router()

router.post('/',async (req,res) =>{
    console.log(req.body)
    const todo = new Todo({
        name:req.body.name,
        data:req.body.date,
        title:req.body.title
    })
     await todo.save().then(() => {
        res.status(201).json({todo,message:'Successfully Created The Body'})   
        res.send("")

    }).catch(() => {
        console.log(todo);
        res.send("Error Creating the body")
    })
    
})

router.get('/',async (req,res) => {
    try{
        const todos = await Todo.find()
        res.status(200).json({todos,message:'Successfully Created The Body'})    
    }
    catch{
        res.send("Error")
    }
})
router.patch('/:name',async (req,res) => {
    try{
        const name = await req.params.name
        const todo = await Todo.findOneAndUpdate({
            name:name,
        },
        {
        name:req.body.name,
        data:req.body.date,
        title:req.body.title,
        })
        res.status(200).json({name:name})
    }catch{
        res.send("Error updating")
    }
})
router.delete('/:name',async(req,res) => {
    try{
        const name =await req.params.name
        const todo = await Todo.findOneAndDelete({name:name})
        res.status(200).json({name:todo})

    }catch{
        res.status(400).json({name:name})

    }
})
module.exports = router
