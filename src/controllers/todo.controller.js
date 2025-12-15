const todoService  = require('../services/todo.service')
const asyncHandler = require('../utils/asyncHandler');
    
const getAllTodos = asyncHandler(async (req, res) => { 
    const toDos = await todoService.findAll();
    res.status(200).json(toDos);  
});

const createTodo = asyncHandler(async (req, res) => { 
    const newtoDo = await todoService.createTodos(req);
    res.status(201).json(newtoDo);
});

module.exports = { getAllTodos, createTodo };