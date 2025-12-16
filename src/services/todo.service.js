const TodoModel = require('../models/todo.entity');
const { ValidationError, NotFoundError } = require('../errors/ApiError');
const AppDataSource = require('../config/data-source');
const UserService = require('./user.service');

class ToDoService {
    constructor() { 
        this.todoRepository = AppDataSource.getRepository("Todo");
    }

    async findAll() {
        return await this.todoRepository.find();
    }

    async findOneBy(id) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundError(`Le todo avec l'id ${id} n'existe pas`);
        }
        return todo;
    }

    async create(data, userId) {
        if (!data.title || data.title.trim() === "") {
            throw new ValidationError("Le titre est obligatoire");
        }

        const user = await UserService.findById(userId);
        if (!user) {
            throw new NotFoundError("L'utilisateur n'existe pas");
        }

        const todo = {
            title: data.title,
            user: { id: data.userId } 
        };
        const newTodo = this.todoRepository.create(todo);
        return await this.todoRepository.save(newTodo);
    }
}

const todoService = new ToDoService();
module.exports = todoService;
