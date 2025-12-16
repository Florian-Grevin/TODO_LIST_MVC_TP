const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Todo", // Nom utilisé dans le code (repository)
    tableName: "todo", // Nom de la table SQL
    columns: {
    id: {
        primary: true,
        type: "int",
        generated: true, // Auto-incrément
    },
    title: {
        type: "varchar",
    },
    completed: {
        type: "boolean",
        default: false // Impossible d'avoir 2 fois le même email
    }
    },
    relations: {
        user: {
            type: "many-to-one", // [IMPORTANT] On pointe vers la cible
            target: "User", // La cible est l'entité User
            joinColumn: true, // TypeORM doit créer la colonne `userId` ici
            inverseSide: "todos" // Nom de la propriété chez le User (la liste)
        }
    }
});