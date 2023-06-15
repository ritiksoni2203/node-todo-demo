const express = require('express');
const app = express.Router();
const todosController = require('../controllers/todosController');
const { verifyToken } = require('../middleware/authMiddleware.js');

app.get('/admin', verifyToken, todosController.getAllTodosAdmin);
app.get('/', verifyToken, todosController.getAllTodos);
app.post('/', verifyToken, todosController.createTodo);
app.put('/:id', verifyToken, todosController.updateTodo);
app.delete('/:id', verifyToken, todosController.deleteTodo);

module.exports = app;