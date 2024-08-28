const TodoList = require("../models/todolist.model.js");

const getTodosByUserId = async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await TodoList.find({ userid: id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTodos = async (req, res) => {
  try {
    const todo = await TodoList.find({});
    res.status(200).json(todo);
  } catch(error) {
    res.status(500).json({message: error.message});
  }
}

const addTodo = async (req, res) => {
  try {
    const todo = await TodoList.create(req.body);
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoList.findByIdAndUpdate(id, req.body);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await TodoList.findById(id);
    res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await TodoList.findByIdAndDelete(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    await TodoList.deleteMany({});
    return res.status(200).json({ message: "All todos deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {getTodos, addTodo, updateTodo, deleteTodo, getTodosByUserId, deleteAllTodos}