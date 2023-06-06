const Todo = require('../models/todoSchema');

// Get all todos
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

// Create a new todo
const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            todo: req.body.todo,
            done: false
        });
        const savedTodo = await todo.save();
        res.json(savedTodo);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// Update a todo by ID
const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedTodo);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// Delete a todo by ID
const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.json(deletedTodo);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};