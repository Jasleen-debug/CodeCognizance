import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../services/authService";


export const WelcomePage = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

  const logoff = async () => {
    try {
      await logout()
      setAuth({})
      navigate('/')
    } catch (error) {
        console.error('error during logout ', error)
    }
  }
  return (
    <>
      <h1>Welcome, {auth.user?.firstName}</h1>
      <p>You are logged in!</p>
      <br />
      <Link to="/problems">Go to the problems page</Link>
      <br />
      <button onClick={logoff}>Logout</button>
    </>
  )
};