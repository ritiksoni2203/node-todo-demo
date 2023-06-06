const express = require('express');
const app = express.Router();
const todosController = require('../controllers/todosController');

app.get('/', todosController.getAllTodos);
app.post('/', todosController.createTodo);
app.put('/:id', todosController.updateTodo);
app.delete('/:id', todosController.deleteTodo);

module.exports = app;