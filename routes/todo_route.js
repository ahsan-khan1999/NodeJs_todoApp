var express = require('express')
var bodyParser = require('body-parser')
var todo_model = require('../schema/todo_model')
var router= express.Router()

router.post('/', async (req, res) =>{
    const todo = new todo_model({
        name:  req.body.name,
        date:  req.body.date,
        title: req.body.title
    });
    await todo.save().then(() => {
        res.status(201).json({todo: todo, response_message: "Successful response"});
    }).catch(() => {
        res.status(452).send({response_message: "Something went wrong"});
    });
})

router.get('/',async (req, res) => {
    try{
        const todos = await todo_model.find();
        res.status(200).json({todo: todos, response_message: "Successful response"});
    }
    catch{
        res.status(452).send({response_message: "Something went wrong"});
    }
})

router.get('/:id',async (req, res) => {
    try{
        const id = req.params.id;
        const todo = await todo_model.findById(id);
        if (!todo) return res.status(200).json({todo: null, response_message: "Successful response"});

        res.status(200).json({todo: todo, response_message: "Successful response"});
    }
    catch{
        res.status(452).json({response_message: "Something went wrong"});
    }
})

router.put('/:id',async (req, res) => {
    try{
        const id = req.params.id;
        const todo = await todo_model.findOneAndUpdate({
            _id: id
        },
        {
            name:  req.body.name,
            date:  req.body.date,
            title: req.body.title,
        },
        {
            returnDocument: "after"
        })
        res.status(200).json({todo: todo, response_message: "Successful response"})
    }
    catch{
        res.status(452).send({response_message: "Something went wrong"})
    }
})

router.delete('/:id',async(req, res) => {
    try{
        const id = req.params.id
        const todo = await todo_model.findOneAndDelete({_id: id})
        res.status(200).json({todo: todo, response_message: "Successful response"})
    }
    catch{
        res.status(452).send({response_message: "Something went wrong"})
    }
})

module.exports = router
