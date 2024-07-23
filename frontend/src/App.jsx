//import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider,AuthContext } from './contexts/AuthContext';
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm"
import { useContext } from 'react';
import PropTypes from 'prop-types'
//import { checkAuth } from './services/authService';

const PrivateRoute = ({ element }) => {
  const { auth } = useContext(AuthContext)

  /* useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authData = await checkAuth();
        console.log("Auth Data:", authData); // Debugging
        setAuth({
          isAuthenticated: authData.isAuthenticated,
          loading: false,
          user: authData.user,
        });
      } catch (error) {
        console.error("Error checking auth status:", error);
        setAuth({
          isAuthenticated: false,
          loading: false,
          user: null,
        });
      }
    };

    if (!auth.isAuthenticated && auth.loading) {
      verifyAuth();
    }
  }, [auth.loading, setAuth]); */

  console.log("Auth State in PrivateRoute:", auth);
  if (auth.loading) {
    return <div>Loading...</div>; // Display a loading state if needed
  }
  return auth.isAuthenticated ? element : <Navigate to="/login"/>
}
PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/welcome" element={<PrivateRoute element={<WelcomePage />} />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
const LandingPage = () => (
  <div>
    <h1>Welcome to the App</h1>
    <nav>
      <a href="/register">Register</a>
      <a href="/login">Login</a>
    </nav>
  </div>
);

const WelcomePage = () => {
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
  }
  console.log("here")
  return (
    <>
      <h1>Welcome, {auth.user?.firstName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
};

export default App;
