import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import LandingPage from './pages/LandingPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App
