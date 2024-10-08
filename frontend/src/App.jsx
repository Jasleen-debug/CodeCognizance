import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import Unauthorized from './components/Unauthorized'
import Missing from './components/Missing'
import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import { WelcomePage } from './components/Welcome'
import { ProblemsPage } from './components/Problems'
import { ProblemDetailPage } from './components/Problem'
import { SubmissionsPage } from './components/Submissions'
import Profile from './components/Profile'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="problems/:id" element={<ProblemDetailPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
        </Route>
        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
