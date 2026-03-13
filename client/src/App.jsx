import { useState } from 'react'
import { BrowserRouter as Router, Routes,Route  } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
