require('dotenv').config();

const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./errors/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

//Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>ToDo</title>
      </head>
      <body>
        <h1>ToDo</h1>
        <a href="/api/todos">Liste</a>

        <form id="todoForm" action="/api/todos" method="post">
            <label for="id">ID :</label>
            <input type="number" id="id" name="id" ><br><br>

            <label for="title">Titre :</label>
            <input type="text" id="title" name="title" ><br><br>

            <label for="completed">Terminé :</label>
            <input type="checkbox" id="completed" name="completed"><br><br>

            <button type="submit">Ajouter</button>
        </form>
      </body>
    </html>
  `);
});

app.use('/api/todos', todoRoutes);

app.use(errorHandler);

module.exports = app;