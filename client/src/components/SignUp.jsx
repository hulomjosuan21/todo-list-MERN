import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../context/AuthActions";
import { googleProvider, auth } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
const SignUp = () => {
  const URL = import.meta.env.REACT_APP_API_URL;
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_Password] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function handleGoogleSignUp() {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;

        // Extract displayName and uid
        const email = user.email;
        const uid = user.uid;

        try {
          const response = await axios.post(`${URL}/user`, {
            username: email,
            password: `G-${uid}`,
          });

          console.log(response.data);
          dispatch(loginUser(response.data));
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleSignUp(e) {
    e.preventDefault();

    if (username) {
      if (password === re_password) {
        try {
          const response = await axios.post(`${URL}/user`, {
            username: username,
            password: password,
          });

          console.log(response.data);
          dispatch(loginUser(response.data));
          navigate("/");
          e.target.reset();
        } catch (error) {
          console.log(error.message);
        }
      } else {
        window.alert("Password not match.");
      }
    }
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

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
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

        <div className="d-grid my-2">
          <Button variant="primary" size="md" onClick={handleGoogleSignUp}>
            Or continue with <i className="fa-brands fa-google"></i>
          </Button>
        </div>

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
