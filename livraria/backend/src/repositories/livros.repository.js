const RepositoryBase = require("./repository.interface");
const db = require("../database/sqlite");
const Livro = require("../models/livro.model");

class LivrosRepository extends RepositoryBase {
    constructor() { super(); }

    async findAll() {
        // Removido 'categoria' do SELECT
        const rows = db.all("SELECT id, titulo, autor, ano, editora, imagem_capa FROM livros ORDER BY id ASC");
        return rows.map(row => Livro.fromJSON(row));
    }

    async findById(id) {
        // Removido 'categoria' do SELECT
        const row = db.get("SELECT id, titulo, autor, ano, editora, imagem_capa FROM livros WHERE id = ?", [id]);
        return row ? Livro.fromJSON(row) : null;
    }

    async create(livroData) {
        const novoLivro = new Livro({ id: null, ...livroData });
        // Removido 'categoria' do INSERT
        const result = db.run(
            "INSERT INTO livros (titulo, autor, ano, editora, imagem_capa) VALUES (?, ?, ?, ?, ?)",
            [novoLivro.titulo, novoLivro.autor, novoLivro.ano, novoLivro.editora, novoLivro.imagem_capa]
        );
        return this.findById(result.lastInsertRowid);
    }

    async update(id, dadosAtualizados) {
        const existente = await this.findById(id);
        if (!existente) {
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }

        if (dadosAtualizados.imagem_capa === undefined) {
            dadosAtualizados.imagem_capa = existente.imagem_capa;
        }

        const atualizado = new Livro({ ...existente.toJSON(), ...dadosAtualizados });
        
        // Removido 'categoria' do UPDATE
        db.run(
            "UPDATE livros SET titulo = ?, autor = ?, ano = ?, editora = ?, imagem_capa = ? WHERE id = ?",
            [atualizado.titulo, atualizado.autor, atualizado.ano, atualizado.editora, atualizado.imagem_capa, id]
        );
        return this.findById(id);
    }

    async delete(id) {
        const existente = this.findById(id);
        if (!existente) {
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        db.run("DELETE FROM livros WHERE id = ?", [id]);
        return existente;
    }
}

module.exports = LivrosRepository;