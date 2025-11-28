const bcrypt = require('bcrypt');
const UsersRepository = require('../repositories/users.repository');
const User = require('../models/user.model');

class AuthController {
    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const userInput = new User({ username, email, password });

            // Verifica se username já existe
            const existingUsername = await this.usersRepository.findByUsername(userInput.username);
            if (existingUsername) { const e = new Error('Nome de usuário já existe'); e.statusCode = 409; throw e; }

            // Verifica se email já existe
            const existingEmail = await this.usersRepository.findByEmail(userInput.email);
            if (existingEmail) { const e = new Error('Email já cadastrado'); e.statusCode = 409; throw e; }

            const passwordHash = await bcrypt.hash(String(password), 10);
            const created = await this.usersRepository.create({ username: userInput.username, email: userInput.email, passwordHash });
            req.session.userId = created.id;
            res.status(201).json({ mensagem: 'Usuário registrado com sucesso', user: created });
        } catch (err) { next(err); }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) { const e = new Error('Credenciais inválidas'); e.statusCode = 400; throw e; }
            const row = await this.usersRepository.findByEmail(email);
            if (!row || !(await bcrypt.compare(String(password), row.password_hash))) {
                const e = new Error('Email ou senha inválidos'); e.statusCode = 401; throw e;
            }
            req.session.userId = row.id;
            const user = User.fromDB(row);
            res.status(200).json({ mensagem: 'Login efetuado', user });
        } catch (err) { next(err); }
    }

    async me(req, res, next) {
        try {
            if (!req.session.userId) return res.status(401).json({ erro: 'Não autenticado' });
            const user = await this.usersRepository.findById(req.session.userId);
            if (!user) return res.status(401).json({ erro: 'Sessão inválida' });
            res.status(200).json(user);
        } catch (err) { next(err); }
    }


    async logout(req, res, next) {
        try { req.session.destroy(err => err ? next(err) : res.status(200).json({ mensagem: 'Logout realizado com sucesso.' })); }
        catch (err) { next(err); }
    }
}

module.exports = AuthController;
