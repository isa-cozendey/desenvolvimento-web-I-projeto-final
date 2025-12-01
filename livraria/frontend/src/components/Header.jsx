import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext'; // Importar hook
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme(); // Usar hook
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="logo">
                    <h1>📚 Livraria</h1>
                </Link>

                <nav className="nav">
                    {/* Botão de Tema */}
                    <button onClick={toggleTheme} className="btn-theme" title="Mudar Tema">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    {user ? (
                        <>
                            <Link to="/" className="nav-link">Início</Link>
                            <Link to="/livros" className="nav-link">Livros</Link>
                            <div className="user-info">
                                <span>Olá, {user.username || user.email}!</span>
                                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                    Sair
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Registrar</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;