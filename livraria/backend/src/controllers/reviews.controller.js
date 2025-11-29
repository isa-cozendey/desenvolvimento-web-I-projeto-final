// src/controllers/reviews.controller.js
const ReviewsRepository = require("../repositories/reviews.repository");
const repository = new ReviewsRepository();

exports.criarReview = async (req, res, next) => {
    try {
        const { livroId } = req.params;
        const { nota, comentario } = req.body;

        // --- A MÁGICA ESTÁ AQUI ---
        // Pegamos direto o userId (que no seu log mostrou ser "2")
        const userId = req.session.userId; 

        // Se por acaso não tiver ID, aí sim dá erro
        if (!userId) {
            return res.status(401).json({ erro: "Usuário não autenticado." });
        }

        const review = await repository.create({ 
            livro_id: livroId, 
            user_id: userId, 
            nota, 
            comentario 
        });

        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

exports.listarPorLivro = async (req, res, next) => {
    try {
        const { livroId } = req.params;
        const reviews = await repository.findByLivroId(livroId);
        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

exports.deletarReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const userId = req.session.userId;
        if (!userId) return res.status(401).json({ erro: "Não autorizado" });

        await repository.delete(id, userId);
        res.status(204).send();
    } catch (error) {
        next(error); 
    }
}