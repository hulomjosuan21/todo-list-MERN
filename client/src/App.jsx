/* eslint-disable react/prop-types */
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.current_user);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  return user ? children : null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
