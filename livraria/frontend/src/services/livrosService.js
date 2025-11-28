import api from './api';

export const livrosService = {
    async listar() {
        const response = await api.get('/livros');
        return response.data;
    },

    async buscarPorId(id) {
        const response = await api.get(`/livros/${id}`);
        return response.data;
    },

    async criar(livro) {
        console.log(livro);

        const response = await api.post('/livros', livro);
        return response.data;
    },

    async atualizar(id, livro) {
        const response = await api.put(`/livros/${id}`, livro);
        return response.data;
    },

    async remover(id) {
        const response = await api.delete(`/livros/${id}`);
        return response.data;
    }
};
