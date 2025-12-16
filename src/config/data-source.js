const { DataSource } = require("typeorm");

// Configuration centralisée
const AppDataSource = new DataSource({
  type: "sqlite",                 // Type de base
  database: "database.sqlite",    // Fichier SQLite créé automatiquement
  synchronize: true,              // Crée les tables automatiquement (à éviter en prod)
  logging: true,                  // Affiche les requêtes SQL
  entities: [], // Chemin vers tes entités
});

module.exports = AppDataSource;
