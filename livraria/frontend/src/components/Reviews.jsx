import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importando seu Contexto
import { reviewsService } from '../services/reviewsService';
import './Reviews.css';

const Reviews = ({ livroId }) => {
    const { user } = useAuth(); // Pegando usuário logado
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados do formulário
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');

    useEffect(() => {
        carregarReviews();
    }, [livroId]);

    const carregarReviews = async () => {
        try {
            const data = await reviewsService.getByLivroId(livroId);
            setReviews(data);
        } catch (error) {
            console.error("Erro ao carregar reviews", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await reviewsService.create(livroId, { nota: Number(nota), comentario });
            setNota(5);
            setComentario('');
            carregarReviews(); // Recarrega a lista
        } catch (error) {
            alert('Erro ao enviar avaliação.');
        }
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('Tem certeza que deseja apagar seu comentário?')) {
            try {
                await reviewsService.delete(livroId, reviewId);
                carregarReviews();
            } catch (error) {
                alert('Erro ao deletar.');
            }
        }
    };

    // Função auxiliar para desenhar estrelas
    const renderStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

    if (loading) return <p style={{fontSize: '12px'}}>Carregando avaliações...</p>;

    return (
        <div className="reviews-section">
            <div className="reviews-list">
                {reviews.length === 0 ? (
                    <p style={{fontSize: '13px', color: '#888', textAlign: 'center'}}>Seja o primeiro a avaliar!</p>
                ) : (
                    reviews.map((rev) => (
                        <div key={rev.id} className="review-item">
                            <div className="review-header">
                                <span className="review-author">{rev.username}</span>
                                <span className="review-stars">{renderStars(rev.nota)}</span>
                            </div>
                            <p className="review-text">"{rev.comentario}"</p>
                            
                            {/* Só mostra botão de deletar se o usuário for dono da review */}
                            {user && user.id === rev.user_id && (
                                <button onClick={() => handleDelete(rev.id)} className="btn-delete-review">
                                    Excluir
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {user ? (
                <form onSubmit={handleSubmit} className="review-form">
                    <div style={{display: 'flex', gap: '5px'}}>
                        <select value={nota} onChange={e => setNota(e.target.value)} style={{flex: 1}}>
                            <option value="5">★★★★★ Excelente</option>
                            <option value="4">★★★★ Muito Bom</option>
                            <option value="3">★★★ Bom</option>
                            <option value="2">★★ Regular</option>
                            <option value="1">★ Ruim</option>
                        </select>
                        <button type="submit">Enviar</button>
                    </div>
                    <textarea 
                        placeholder="Escreva um comentário..." 
                        rows="2"
                        value={comentario}
                        onChange={e => setComentario(e.target.value)}
                        required
                    />
                </form>
            ) : (
                <p style={{fontSize: '12px', textAlign: 'center', color: '#666'}}>
                    <a href="/login" style={{color: '#007bff'}}>Faça login</a> para avaliar.
                </p>
            )}
        </div>
    );
};

export default Reviews;