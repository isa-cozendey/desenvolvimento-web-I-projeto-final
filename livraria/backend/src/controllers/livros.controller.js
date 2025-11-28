const LivrosRepository = require("../repositories/livros.repository");

class LivrosController {
    constructor() {
        this.livrosRepository = new LivrosRepository();
    }

    async listarLivros(req, res, next) {
        const livros = await this.livrosRepository.findAll();
        res.status(200).json(livros);
    }

    async buscarLivroPorId(req, res, next) {
        const id = parseInt(req.params.id);
        const livro = await this.livrosRepository.findById(id);
        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }
        res.status(200).json(livro);
    }

    async criarLivro(req, res, next) {
        const { titulo, autor, categoria, ano, editora } = req.body;
        const novoLivro = await this.livrosRepository.create({
            titulo,
            autor,
            categoria,
            ano: parseInt(ano),
            editora
        });
        res.status(201).json({
            mensagem: "Livro criado com sucesso",
            data: novoLivro
        });
    }

    async atualizarLivro(req, res, next) {
        const id = parseInt(req.params.id);
        const { titulo, autor, categoria, ano, editora } = req.body;
        const livroAtualizado = await this.livrosRepository.update(id, {
            titulo,
            autor,
            categoria,
            ano: parseInt(ano),
            editora
        });

        res.status(200).json({
            mensagem: "Livro atualizado com sucesso",
            data: livroAtualizado
        });
    }

    async removerLivro(req, res, next) {
        const id = parseInt(req.params.id);
        const livroRemovido = await this.livrosRepository.delete(id);
        res.status(200).json({
            mensagem: "Livro removido com sucesso",
            data: livroRemovido
        });
    }


}

module.exports = LivrosController;