const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UsersRepository = require('../repositories/users.repository');
const User = require('../models/user.model');

// Carrega as variáveis do .env
require('dotenv').config(); 

class AuthController {
    constructor() {
        this.usersRepository = new UsersRepository();
        
        // Configuração do transporte de e-mail (Gmail)
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const userInput = new User({ username, email, password });

            const existingUsername = await this.usersRepository.findByUsername(userInput.username);
            if (existingUsername) { const e = new Error('Nome de utilizador já existe'); e.statusCode = 409; throw e; }

            const existingEmail = await this.usersRepository.findByEmail(userInput.email);
            if (existingEmail) { const e = new Error('Email já cadastrado'); e.statusCode = 409; throw e; }

            const passwordHash = await bcrypt.hash(String(password), 10);
            const created = await this.usersRepository.create({ username: userInput.username, email: userInput.email, passwordHash });
            req.session.userId = created.id;
            res.status(201).json({ mensagem: 'Utilizador registado com sucesso', user: created });
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

    // --- Esqueci a Senha ---
    async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const user = await this.usersRepository.findByEmail(email);

            if (!user) {
                return res.json({ mensagem: 'Se o e-mail existir, receberá um link.' });
            }

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1); // Expira em 1 hora

            await this.usersRepository.saveResetToken(user.id, token, now.getTime());

            // CORREÇÃO AQUI: Porta alterada para 3000
            const resetLink = `http://localhost:3000/reset-password/${token}`;
            
            await this.transporter.sendMail({
                to: email,
                from: `Livraria <${process.env.EMAIL_USER}>`,
                subject: 'Recuperação de Senha',
                html: `
                    <p>Solicitou a troca de senha.</p>
                    <p>Clique no link para criar uma nova senha:</p>
                    <a href="${resetLink}">Redefinir Minha Senha</a>
                    <p>Este link expira em 1 hora.</p>
                `
            });

            res.json({ mensagem: 'E-mail enviado com sucesso.' });

        } catch (err) { next(err); }
    }

    // --- Resetar Senha ---
    async resetPassword(req, res, next) {
        try {
            const { token, newPassword } = req.body;
            const userRow = await this.usersRepository.findByResetToken(token);

            if (!userRow) {
                return res.status(400).json({ erro: 'Link inválido ou expirado.' });
            }

            const passwordHash = await bcrypt.hash(String(newPassword), 10);
            await this.usersRepository.updatePassword(userRow.id, passwordHash);

            res.json({ mensagem: 'Senha alterada com sucesso! Faça login.' });

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