import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import ProfileSetup from './components/ProfileSetup'
import ForgetPassword from './components/ForgetPassword'
import Dashboard from './components/Dashboard.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
    </Router>
  )
}

export default App 