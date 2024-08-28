/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../context/AuthActions";

const SignIn = () => {
  const URL = "http://localhost:2100/user/auth";
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();

    if(username && username){

      try {
        const response = await axios.post(URL, {
          username: username,
          password: password,
        });
  
        dispatch(loginUser(response.data));
        navigate('/');
        e.target.reset();
      } catch ({...error}) {
        console.log(error.message);
        window.alert(error.message);
      }
    }
  }

  return (
    <div className="sign_container">
      <Form onSubmit={handleSignIn} className="sign_form">
        <Form.Group>
          <h3 className="sign_label">Sign In</h3>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show password"
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>

        <Form.Group>
          <NavLink NavLink to="/signup" className="nav_text">
            Don't have an account yet?
          </NavLink>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignIn;
