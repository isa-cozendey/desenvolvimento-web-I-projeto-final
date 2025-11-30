const db = require('../database/sqlite');
const User = require('../models/user.model');

class UsersRepository {
    async findById(id) {
        const row = await db.get('SELECT * FROM users WHERE id = ?', [id]);
        return row ? User.fromDB(row) : null;
    }

    async findByUsername(username) {
        const row = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        return row || null;
    }

    async findByEmail(email) {
        const row = await db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
        return row || null; 
    }

    // NOVO: Busca usuário pelo token válido
    async findByResetToken(token) {
        // Verifica se o token existe e se a data de expiração é maior que AGORA
        const row = await db.get(
            'SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?', 
            [token, Date.now()]
        );
        return row || null;
    }

    async create({ username, email, passwordHash }) {
        const result = await db.run(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', 
            [username, email.toLowerCase(), passwordHash]
        );
        const row = await db.get('SELECT * FROM users WHERE id = ?', [result.lastInsertRowid]);
        return User.fromDB(row);
    }

    // NOVO: Salva o token no banco
    async saveResetToken(userId, token, expires) {
        await db.run(
            'UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?',
            [token, expires, userId]
        );
    }

    // NOVO: Atualiza senha e limpa o token
    async updatePassword(userId, newPasswordHash) {
        await db.run(
            'UPDATE users SET password_hash = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?',
            [newPasswordHash, userId]
        );
    }
}

module.exports = UsersRepository;