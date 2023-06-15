const Todo = require('../models/todoSchema');

const getAllTodos = async (req, res) => {
    try {
        const { query } = req.query;
        const filter = {
            user: req.userId
        }
        if (query) {
            filter.todo = {
                $regex: query,
                $options: 'i'
            }
        }
        const todoRecords = await Todo.find(filter);
        res.json(todoRecords);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const getAllTodosAdmin = async (req, res) => {
    try {
        const { query } = req.query;
        const filter = {}
        if (query) {
            filter.todo = {
                $regex: query,
                $options: 'i'
            }
        }
        const todoRecords = await Todo.find(filter).populate('user', 'username _id');
        res.json(todoRecords);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const createTodo = async (req, res) => {
    try {
        const params = { ...req.body, ...req.params, user: req.userId }
        const todoRecord = await Todo.create({
            ...params
        });
        res.json(todoRecord);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const updateTodo = async (req, res) => {
    try {
        const params = { ...req.params, userId: req.userId };
        const filter = {
            ...params
        }
        const todoRecord = await Todo.findOneAndUpdate(filter, { new: true });
        if (!todoRecord) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodoRecord);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const deleteTodo = async (req, res) => {
    try {
        const params = { ...req.params, user: req.userId.toString() }
        const filter = {
            ...params,
           _id: params.id,
        }
        console.log(filter);
        const todoRecord = await Todo.findOneAndDelete(filter);
        if (!todoRecord) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todoRecord);
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
    deleteTodo,
    getAllTodosAdmin,
};