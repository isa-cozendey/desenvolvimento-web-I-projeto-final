// src/models/livro.model.js
class Livro {
    constructor({ id = null, titulo, autor, categoria, ano, editora = '' }) {
        this.id = id !== undefined ? id : null;
        this.titulo = String(titulo).trim();
        this.autor = String(autor).trim();
        this.categoria = String(categoria).trim();
        this.ano = Number.isInteger(ano) ? ano : parseInt(ano, 10);
        this.editora = editora ? String(editora).trim() : '';

        this._validar();
    }

    static fromJSON(json) {
        return new Livro({
            id: json.id ?? null,
            titulo: json.titulo,
            autor: json.autor,
            categoria: json.categoria,
            ano: json.ano,
            editora: json.editora
        });
    }

    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            autor: this.autor,
            categoria: this.categoria,
            ano: this.ano,
            editora: this.editora
        };
    }

    _validar() {
        const erros = [];

        if (!this.titulo || this.titulo.trim().length === 0) erros.push("Título é obrigatório");
        if (!this.autor || this.autor.trim().length === 0) erros.push("Autor é obrigatório");
        if (!this.categoria || this.categoria.trim().length === 0) erros.push("Categoria é obrigatória");
        if (!Number.isInteger(this.ano) || isNaN(this.ano)) erros.push("Ano deve ser um número válido");
        // editora é opcional, não precisa validação

        if (erros.length > 0) {
            const error = new Error("Dados inválidos");
            error.statusCode = 400;
            error.details = erros;
            throw error;
        }
    }
}

module.exports = Livro;
