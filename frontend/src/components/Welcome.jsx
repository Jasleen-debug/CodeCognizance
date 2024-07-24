import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


export const WelcomePage = () => {
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
  }
  console.log("here")
  return (
    <>
      <h1>Welcome, {auth.user?.firstName}</h1>
      <button onClick={handleLogout}>Logout</button>
      <nav>
        <a href="/welcome/problems">Problems</a>
      </nav>
    </>
  )
};