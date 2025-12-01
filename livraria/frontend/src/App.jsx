import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext' // <--- IMPORTA AQUI
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Livros from './pages/Livros'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

import './App.css'

function App() {
    return (
        <ThemeProvider> {/* <--- ENVOLVE TUDO (Provider de Tema) */}
            <AuthProvider>
                <Router>
                    <div className="app">
                        <Header />
                        <main className="main-content">
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/reset-password/:token" element={<ResetPassword />} />

                                <Route path="/" element={
                                    <PrivateRoute><Home /></PrivateRoute>
                                } />
                                <Route path="/livros" element={
                                    <PrivateRoute><Livros /></PrivateRoute>
                                } />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App