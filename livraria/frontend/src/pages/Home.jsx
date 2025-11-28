import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="container">
            <div className="home-container">
                <div className="welcome-card">
                    <h1>Bem-vindo ao Sistema de Gerenciamento de Livraria! 📚</h1>
                    <p className="subtitle">
                        Olá, <strong>{user?.username || user?.email}</strong>!
                    </p>
                    <p>
                        Este é um sistema completo para gerenciar sua coleção de livros.
                        Você pode adicionar, editar, visualizar e remover livros da sua biblioteca.
                    </p>

                    <div className="features">
                        <h2>Recursos disponíveis:</h2>
                        <ul>
                            <li>✅ Listar todos os livros</li>
                            <li>✅ Adicionar novos livros</li>
                            <li>✅ Editar informações dos livros</li>
                            <li>✅ Remover livros</li>
                            <li>✅ Sistema de autenticação seguro</li>
                        </ul>
                    </div>

                    <div className="cta">
                        <Link to="/livros" className="btn btn-primary btn-large">
                            Ver Meus Livros
                        </Link>
                    </div>
                </div>

                <div className="info-cards">
                    <div className="info-card">
                        <h3>📖 Organize sua biblioteca</h3>
                        <p>Mantenha todos os seus livros organizados em um único lugar.</p>
                    </div>
                    <div className="info-card">
                        <h3>🔍 Encontre facilmente</h3>
                        <p>Visualize e gerencie sua coleção de forma simples e eficiente.</p>
                    </div>
                    <div className="info-card">
                        <h3>🔒 Seguro</h3>
                        <p>Seus dados estão protegidos com autenticação segura.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
