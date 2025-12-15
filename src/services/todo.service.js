const todosModel = require('../models/todo.model')

const {ValidationError, NotFoundError} = require('../errors/ApiError')

class TodoService {

    static findAll() {
        if(todosModel == undefined) {
            throw new ValidationError("La liste est vide");
        }
        return todosModel
    }

    static createTodos(req) {
         if(req.body.title.trim() == "") {
            throw new ValidationError("Le titre est obligatoire");
         }
         return req.body;
    }
}  

module.exports = TodoService