//import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider,AuthContext } from './contexts/AuthContext'
import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import { WelcomePage } from './components/Welcome'
import { ProblemsPage } from './components/Problems'
import { ProblemDetailPage } from './components/Problem';
import { useContext } from 'react'
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
          {/* <Route path="/welcome" element={<PrivateRoute element={<WelcomePage />} />} /> */}
          {/* <Route path="/welcome/problems" element={<PrivateRoute element={<ProblemsPage />} />} /> */}
          {/*  <Route path="/welcome/problems/:id" element={<PrivateRoute element={<ProblemDetailPage />} />} /> */}
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/welcome/problems" element={<ProblemsPage />} />
          <Route path="/welcome/problems/:id" element={<ProblemDetailPage />} />
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

export default App;
