import React, { useState } from 'react';
import Reviews from './Reviews'; 
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete }) => {
    const [showReviews, setShowReviews] = useState(false);

    // Constrói a URL da imagem (se houver)
const imagemCapa = livro.imagem_url || (livro.imagem_capa ? `http://localhost:3333/uploads/${livro.imagem_capa}` : null);

return (
    <div className="livro-card">
        
        {/* ÁREA DA CAPA (Melhorada) */}
        <div className="livro-capa-container">
            {imagemCapa ? (
                <img 
                    src={imagemCapa} 
                    alt={`Capa de ${livro.titulo}`} 
                    className="livro-capa-img"
                />
            ) : (
                <div className="livro-capa-placeholder">
                    <span>Sem Capa</span>
                </div>
            )}
        </div>

        <div className="livro-info">
            <h3>{livro.titulo}</h3>
            <p className="autor"><strong>Autor:</strong> {livro.autor}</p>
            <div className="meta-info">
                <span className="ano">{livro.ano}</span>
                {livro.editora && <span className="editora"> • {livro.editora}</span>}
            </div>
        </div>

        <div className="card-actions">
            <button onClick={() => onEdit(livro)} className="btn btn-primary">✏️ Editar</button>
            <button onClick={() => onDelete(livro.id)} className="btn btn-danger">🗑️ Remover</button>
        </div>

        <div className="reviews-toggle-container">
            <button 
                onClick={() => setShowReviews(!showReviews)}
                className="btn-toggle-reviews"
            >
                {showReviews ? '▲ Ocultar Avaliações' : '▼ Ver Avaliações'}
            </button>

            {showReviews && <Reviews livroId={livro.id} />}
        </div>
    </div>
);
};
export default LivroCard;