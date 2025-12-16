const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Tag", 
    tableName: "tag", 
    columns: {
    id: {
        primary: true,
        type: "int",
        generated: true, 
    },
    label: {
        type: "varchar",
        unique: true,
    }
    },
    relations: {
        todos: {
            type: "many-to-many",
            target: "Todo",
            inverseSide: "tags",
            joinTable: true,
        }
    }
});