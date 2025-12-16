require('dotenv').config();

const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./errors/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Users</title>
      </head>
      <body>
        <h1>Users</h1>
        <a href="/api/todos">Liste des utilisateurs</a>

        <form id="userForm" action="/api/todos" method="post">
            <label for="name">Nom :</label>
            <input type="text" id="name" name="name" required><br><br>

            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required><br><br>

            <button type="submit">Ajouter</button>
        </form>
      </body>
    </html>
  `);
});

app.use('/api/todos', todoRoutes);

app.use(errorHandler);

module.exports = app;