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
    console.log("Enviando livro com imagem:", livro);

    // AQUI ESTÁ O SEGREDO:
    // Avisamos o axios para usar multipart/form-data (para arquivos)
    // em vez do application/json padrão
    const response = await api.post('/livros', livro, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
},

async atualizar(id, livro) {
    // A mesma coisa aqui na atualização
    const response = await api.put(`/livros/${id}`, livro, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
},

async remover(id) {
    const response = await api.delete(`/livros/${id}`);
    return response.data;
}
};