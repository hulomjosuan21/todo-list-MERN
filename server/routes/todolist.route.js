const express = require("express");
const { getTodosByUserId, getTodos, addTodo, updateTodo, deleteTodo, deleteAllTodos } = require("../controllers/todolist.controller");
const router = express.Router();

router.get("/", getTodos);
router.get("/:id", getTodosByUserId);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.delete("/",deleteAllTodos)

module.exports = router;