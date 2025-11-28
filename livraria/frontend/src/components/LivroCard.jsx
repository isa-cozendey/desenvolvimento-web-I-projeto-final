import React from 'react';
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete }) => {
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
        </div>
    );
};

export default LivroCard;
