import { useAuth } from "../context/AuthContext"

const Home = () => {

  const { user, logout } = useAuth();
  return (
    <div>
      {user.username}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
