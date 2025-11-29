import React, { useState } from 'react';
import Reviews from './Reviews'; // <--- Importe o novo componente
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete }) => {
    // Estado para controlar se as reviews estão visíveis ou não
    const [showReviews, setShowReviews] = useState(false);

    return (
        <div className="livro-card">
            <h3>{livro.titulo}</h3>
            <p className="autor"><strong>Autor:</strong> {livro.autor}</p>
            <p className="ano"><strong>Ano:</strong> {livro.ano}</p>
            {livro.editora && <p className="editora"><strong>Editora:</strong> {livro.editora}</p>}

            <div className="card-actions">
                <button onClick={() => onEdit(livro)} className="btn btn-primary">
                    ✏️ Editar
                </button>
                <button onClick={() => onDelete(livro.id)} className="btn btn-danger">
                    🗑️ Remover
                </button>
            </div>

            {/* Botão para mostrar/esconder reviews */}
            <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                <button 
                    onClick={() => setShowReviews(!showReviews)}
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#007bff', 
                        cursor: 'pointer', 
                        fontSize: '14px',
                        width: '100%' 
                    }}
                >
                    {showReviews ? '▲ Ocultar Avaliações' : '▼ Ver Avaliações'}
                </button>

                {/* Se showReviews for true, renderiza o componente */}
                {showReviews && <Reviews livroId={livro.id} />}
            </div>
        </div>
    );
};

export default LivroCard;