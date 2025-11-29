class Review {
    constructor({ id = null, livro_id, user_id, nota, comentario = '', created_at = null, username = null }) {
        this.id = id;
        this.livro_id = livro_id;
        this.user_id = user_id;
        this.nota = Number(nota);
        this.comentario = comentario;
        this.created_at = created_at;
        this.username = username; // Para exibir quem comentou
        this._validar();
    }

    _validar() {
        const erros = [];
        if (!this.livro_id) erros.push("ID do livro é obrigatório");
        if (!this.user_id) erros.push("ID do usuário é obrigatório");
        if (!Number.isInteger(this.nota) || this.nota < 1 || this.nota > 5) {
            erros.push("A nota deve ser um número inteiro entre 1 e 5");
        }
        
        if (erros.length > 0) {
            const error = new Error("Dados de avaliação inválidos");
            error.statusCode = 400;
            error.details = erros;
            throw error;
        }
    }
}

module.exports = Review;