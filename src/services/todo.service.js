const TodoModel = require('../models/todo.model');
const { ValidationError } = require('../errors/ApiError');
const AppDataSource = require('../config/data-source')


class TodoService {
    constructor() { 
        this.userRepository = AppDataSource.getRepository("User")
    }
    async findAll() {
        
        return await this.userRepository.find();
    }

    async findOneBy(id) {
        return "IDK " + id;
    }

    async create(data) {
        if (!data.name || data.name.trim() === "") {
            throw new ValidationError("Le nom est obligatoire");
        }
        else if (!data.email || data.email.trim() === "") {
            throw new ValidationError("Le mail est obligatoire");
        }
        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser);
    }
}

const todoService = new TodoService();
module.exports = todoService