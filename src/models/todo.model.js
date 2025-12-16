const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User", // Nom utilisé dans le code (repository)
    tableName: "users", // Nom de la table SQL
    columns: {
    id: {
    primary: true,
    type: "int",
    generated: true, // Auto-incrément
    },
    name: {
    type: "varchar",
    },
    email: {
    type: "varchar",
    unique: true // Impossible d'avoir 2 fois le même email
    }
    },
});