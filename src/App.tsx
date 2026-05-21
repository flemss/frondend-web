import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import About from './pages/About'
import Control from './pages/Control'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Routes>
        {/* Public routes - no login required */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<><Navbar /><Dashboard /></>} />
        <Route path="/produk" element={<><Navbar /><Products /></>} />
        <Route path="/tentang" element={<><Navbar /><About /></>} />
        
        {/* Protected routes - login required */}
        <Route
          path="/control"
          element={
            <ProtectedRoute>
              <Navbar />
              <Control />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
