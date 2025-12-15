const todosModel = require('../models/todo.model')

class TodoService {

    static findAll() {
        return todosModel
    }

    static createTodos(req) {
         if(req.body.title == "") {
            throw new Error("Un titre est requis");
         }
         return req.body;
    }
}  

module.exports = TodoService