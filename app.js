const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});