require('dotenv').config();

const express = require('express');
const UserRoutes = require('./routes/user.routes');
const TodoRoutes = require('./routes/todo.routes');
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
    <title>Users & Todos</title>
  </head>
  <body>
    <h1>Users</h1>
    <a href="/api/users">Liste des utilisateurs</a>

    <!-- Formulaire pour ajouter un utilisateur -->
    <form id="userForm" action="/api/users" method="post">
      <label for="name">Nom :</label>
      <input type="text" id="name" name="name" required><br><br>

      <label for="email">Email :</label>
      <input type="email" id="email" name="email" required><br><br>

      <button type="submit">Ajouter</button>
    </form>

    <hr>

    <h1>Todos</h1>
    <a href="/api/todos">Liste des todos</a>

    <!-- Formulaire pour ajouter un todo -->
    <form id="todoForm" action="/api/todos" method="post">
        <label for="title">Titre :</label>
        <input type="text" id="title" name="title" required><br><br>

        <label for="completed">Terminé :</label>
        <input type="checkbox" id="completed" name="completed"><br><br>

        <label for="userId">Utilisateur ID :</label>
        <input type="number" id="userId" name="userId" required><br><br>

        <button type="submit">Ajouter Todo</button>
    </form>
  </body>
</html>

  `);
});

app.use('/api/users', UserRoutes);

app.use('/api/todos', TodoRoutes);

app.use(errorHandler);

module.exports = app;