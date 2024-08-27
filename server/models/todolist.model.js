const mongoose = require("mongoose");

const TodoListSchema = mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

const TodoList = mongoose.model("TodoList", TodoListSchema);

module.exports = TodoList;