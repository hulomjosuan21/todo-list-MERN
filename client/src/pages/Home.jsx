/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../context/AuthActions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Home = () => {
  const URL = import.meta.env.REACT_APP_API_URL;
  const user = useSelector((state) => state.current_user);
  const dispatch = useDispatch();

  const [getTodos, setTodos] = useState([]);
  const [show, handleShow] = useState(false);

  const [newTodo, setNewTodo] = useState({ title: "", duedate: null });

  async function handleAddTodo() {
    if (!newTodo.title) {
      window.alert("Please input all fields");
      return;
    }

    console.log({ ...newTodo, userid: user._id });

    try {
      await axios
        .post(`${URL}/todo`, { ...newTodo, userid: user._id })
        .catch(() => {
          window.alert("Something went wrong");
        });
    } catch {
      window.alert("Something went wrong");
    }

    handleShow(false);
    setNewTodo({ title: "", duedate: null });
  }

  async function handleStatus(id, stat) {
    try {
      await axios
        .put(`${URL}/todo/${id}`, { status: !stat })
        .catch(() => {
          window.alert("Something went wrong");
        });
    } catch {
      window.alert("Something went wrong");
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${URL}/todo/${id}`).catch(() => {
        window.alert("Something went wrong");
      });
    } catch {
      window.alert("Something went wrong");
    }
  }

  async function getAllTodos() {
    try {
      await axios
        .get(`${URL}/todo/${user._id}`)
        .then((response) => {
          setTodos(response.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    return () => getAllTodos();
  });

  return (
    <>
      <AddTodoModal
        {...{
          show,
          handleShow,
          newTodo,
          setNewTodo,
          handleAddTodo,
        }}
      />

      <div>
        <header>
          <span className="logo_text">Todo-List</span>
          <button className="btn-header" onClick={() => dispatch(logoutUser())}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </header>
        <div className="add_btn" onClick={() => handleShow(true)}>
          <i className="fa-solid fa-plus"></i>
        </div>

        <h3 className="todos_label">Task</h3>
        <section className="todo_wrapper">
          {getTodos.length > 0
            ? getTodos.map((todo, index) => (
                <TodoController
                  key={index}
                  todo={todo}
                  handleDelete={handleDelete}
                  handleStatus={handleStatus}
                />
              ))
            : "No Todos yet"}
        </section>
      </div>
    </>
  );
};

const TodoController = ({ todo, handleDelete, handleStatus }) => {
  return (
    
    <div className="todo_controller">
      <button
        onClick={() => handleStatus(todo._id, todo.status)}
        style={{
          backgroundColor: todo.status
            ? "rgb(135, 120, 232)"
            : "rgb(202, 202, 59)",
        }}
      >
        {todo.status ? "Complete" : "Ongoing"}
      </button>
      <div>
        <span>{todo.title}</span>
        <span>
          {todo.duedate &&
            `Due: ${new Date(todo.duedate).toLocaleDateString()}`}
        </span>
      </div>
      <button onClick={() => handleDelete(todo._id)}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

const AddTodoModal = ({
  show,
  handleShow,
  newTodo,
  setNewTodo,
  handleAddTodo,
}) => {
  return (
    <Modal show={show} onHide={() => handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="test"
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Due-date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) =>
                setNewTodo({ ...newTodo, duedate: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddTodo}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Home;
