const { DataSource } = require("typeorm");
const UserSchema = require("../models/user.entity");
const TodoSchema = require("../models/todo.entity");

// Configuration centralisée
const AppDataSource = new DataSource({
  type: "sqlite",                 // Type de base
  database: "database.sqlite",    // Fichier SQLite créé automatiquement
  synchronize: true,              // Crée les tables automatiquement (à éviter en prod)
  logging: true,                  // Affiche les requêtes SQL
  entities: [UserSchema, TodoSchema], // Chemin vers tes entités
  //require('../models/user.entity');
  //require('../models/user.service');
});

module.exports = AppDataSource;
