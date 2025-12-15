const todoService  = require('../services/todo.service')
const todoAsyncHandler = require('../utils/asyncHandler');
    
const getAllTodos = todoAsyncHandler(async (req, res) => { 
    const toDos = todoService.findAll();
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(toDos));  
});

const createTodo = todoAsyncHandler(async (req, res) => { 
    const createtoDos = todoService.createTodos(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(createtoDos));
});

module.exports = { getAllTodos, createTodo };