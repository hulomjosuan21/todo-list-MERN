/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from 'axios';

const SignUp = () => {
  const URL = 'http://localhost:2100/user'
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_Password] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();

    if(username && password) {
      try {
        const response = await axios.post(URL, {
          username: username,
          password: password
        })

        console.log(response.data)
      } catch(error) {
        console.log(error.message)
      }
    }

    e.target.reset();
  }

  return (
    <div className="sign_container">
      <Form onSubmit={handleSignUp} className="sign_form">
        <Form.Group>
          <h3 className="sign_label">Sign Up</h3>
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter Password"
            onChange={(e) => setRe_Password(e.target.value)}
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
          Sign Up
        </Button>

        <Form.Group>
          <NavLink to="/signin" className="nav_text">
            Already have an account?
          </NavLink>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignUp;
