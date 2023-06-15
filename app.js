const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const todosRouter = require('./routes/todos');
const authRouter = require('./routes/auth');

app.use('/auth', authRouter);
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
