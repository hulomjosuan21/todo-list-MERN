const mongoose = require("mongoose");

const TodoListSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: [true, "Please inter a task"]
    },

    status: {
      type: Boolean,
      required: true,
      default: false
    },

    duedate: {
      type: Date,
      required: false,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const TodoList = mongoose.model("TodoList", TodoListSchema);

module.exports = TodoList;
