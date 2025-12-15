const express = require('express');
const router = express.Router();

const todoController  = require('../controllers/todo.controller')

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);

module.exports = router;