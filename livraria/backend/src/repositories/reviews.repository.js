const db = require("../database/sqlite");
const Review = require("../models/review.model");

class ReviewsRepository {
    
    async create({ livro_id, user_id, nota, comentario }) {
        const result = db.run(
            "INSERT INTO reviews (livro_id, user_id, nota, comentario) VALUES (?, ?, ?, ?)",
            [livro_id, user_id, nota, comentario]
        );
        return this.findById(result.lastInsertRowid);
    }

    async findByLivroId(livro_id) {
        const sql = `
            SELECT r.*, u.username 
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.livro_id = ?
            ORDER BY r.created_at DESC
        `;
        const rows = db.all(sql, [livro_id]);
        return rows.map(row => new Review(row));
    }

    async findById(id) {
        const sql = `
            SELECT r.*, u.username 
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.id = ?
        `;
        const row = db.get(sql, [id]);
        return row ? new Review(row) : null;
    }
    
    async delete(id, user_id) {
        const review = await this.findById(id);
        if (!review) throw new Error("Review não encontrada");
        
        if (review.user_id !== user_id) {
             const error = new Error("Sem permissão para deletar esta review");
             error.statusCode = 403;
             throw error;
        }

        db.run("DELETE FROM reviews WHERE id = ?", [id]);
        return { message: "Deletado com sucesso" };
    }
}

module.exports = ReviewsRepository;