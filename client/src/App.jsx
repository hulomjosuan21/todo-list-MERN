/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import './App.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  return user ? children : null;
};


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path="/" element={<PrivateRoute children={<Home />}/>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
