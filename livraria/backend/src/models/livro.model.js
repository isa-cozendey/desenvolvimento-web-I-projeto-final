class Livro {
    constructor({ id = null, titulo, autor, ano, editora = '', imagem_capa = null }) {
        this.id = id !== undefined ? id : null;
        this.titulo = String(titulo).trim();
        this.autor = String(autor).trim();
        this.ano = Number.isInteger(ano) ? ano : parseInt(ano, 10);
        this.editora = editora ? String(editora).trim() : '';
        this.imagem_capa = imagem_capa;

        this._validar();
    }

    static fromJSON(json) {
        return new Livro({
            id: json.id ?? null,
            titulo: json.titulo,
            autor: json.autor,
            ano: json.ano,
            editora: json.editora,
            imagem_capa: json.imagem_capa
        });
    }

    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            autor: this.autor,
            ano: this.ano,
            editora: this.editora,
            imagem_capa: this.imagem_capa
        };
    }

    _validar() {
        const erros = [];
        if (!this.titulo || this.titulo.trim().length === 0) erros.push("Título é obrigatório");
        if (!this.autor || this.autor.trim().length === 0) erros.push("Autor é obrigatório");
        if (!Number.isInteger(this.ano) || isNaN(this.ano)) erros.push("Ano deve ser um número válido");
        
        if (erros.length > 0) {
            const error = new Error("Dados inválidos");
            error.statusCode = 400;
            error.details = erros;
            throw error;
        }
    }
}

module.exports = Livro;