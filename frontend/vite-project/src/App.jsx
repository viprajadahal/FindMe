import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App