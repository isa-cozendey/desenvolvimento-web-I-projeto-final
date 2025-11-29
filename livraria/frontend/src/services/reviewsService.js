import api from './api';

export const reviewsService = {
    // Buscar reviews de um livro
    getByLivroId: async (livroId) => {
        const response = await api.get(`/livros/${livroId}/reviews`);
        return response.data;
    },

    // Criar review
    create: async (livroId, data) => {
        const response = await api.post(`/livros/${livroId}/reviews`, data);
        return response.data;
    },

    // Deletar review (passamos o livroId na URL também por causa da sua rota aninhada)
    delete: async (livroId, reviewId) => {
        await api.delete(`/livros/${livroId}/reviews/${reviewId}`);
    }
};