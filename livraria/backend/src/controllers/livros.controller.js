const LivrosRepository = require("../repositories/livros.repository");

class LivrosController {
    constructor() {
        this.livrosRepository = new LivrosRepository();
    }

    _montarUrlImagem(req, livro) {
        if (!livro) return null;
        const json = livro.toJSON ? livro.toJSON() : livro;
        if (json.imagem_capa) {
            return {
                ...json,
                imagem_url: `${req.protocol}://${req.get('host')}/uploads/${json.imagem_capa}`
            };
        }
        return json;
    }

    async listarLivros(req, res, next) {
        try {
            const livros = await this.livrosRepository.findAll();
            const livrosComUrl = livros.map(l => this._montarUrlImagem(req, l));
            res.status(200).json(livrosComUrl);
        } catch (err) { next(err); }
    }

    async buscarLivroPorId(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const livro = await this.livrosRepository.findById(id);
            if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
            res.status(200).json(this._montarUrlImagem(req, livro));
        } catch (err) { next(err); }
    }

    async criarLivro(req, res, next) {
        try {
            // Removida a 'categoria' e os console.log
            const { titulo, autor, ano, editora } = req.body;
            const imagem_capa = req.file ? req.file.filename : null;

            const novoLivro = await this.livrosRepository.create({
                titulo,
                autor,
                ano: parseInt(ano),
                editora,
                imagem_capa 
            });
            
            res.status(201).json({
                mensagem: "Livro criado com sucesso",
                data: this._montarUrlImagem(req, novoLivro)
            });
        } catch (error) {
            next(error);
        }
    }

    async atualizarLivro(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            // Removida a 'categoria'
            const { titulo, autor, ano, editora } = req.body;
            
            const dados = { titulo, autor, ano: parseInt(ano), editora };

            if (req.file) {
                dados.imagem_capa = req.file.filename;
            }

            const atualizado = await this.livrosRepository.update(id, dados);
            res.status(200).json({
                mensagem: "Livro atualizado com sucesso",
                data: this._montarUrlImagem(req, atualizado)
            });
        } catch (err) { next(err); }
    }

    async removerLivro(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const removido = await this.livrosRepository.delete(id);
            res.status(200).json({ mensagem: "Livro removido", data: removido });
        } catch (err) { next(err); }
    }
}

module.exports = LivrosController;