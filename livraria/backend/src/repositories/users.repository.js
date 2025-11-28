const db = require('../database/sqlite');
const User = require('../models/user.model');

class UsersRepository {
    async findById(id) {
        const row = await db.get('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
        return row ? User.fromDB(row) : null;
    }
    async findByUsername(username) {
        const row = await db.get('SELECT id, username, email, password_hash, created_at FROM users WHERE username = ?', [username]);
        return row || null; // inclui password_hash
    }
    async findByEmail(email) {
        const row = await db.get('SELECT id, username, email, password_hash, created_at FROM users WHERE email = ?', [email.toLowerCase()]);
        return row || null; // inclui password_hash
    }
    async create({ username, email, passwordHash }) {
        const result = await db.run('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email.toLowerCase(), passwordHash]);
        console.log(result);

        const row = await db.get('SELECT id, username, email, created_at FROM users WHERE id = ?', [result.lastInsertRowid]);
        return User.fromDB(row);
    }
}

module.exports = UsersRepository;
