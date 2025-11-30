const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { requireAuth } = require('../middlewares/auth');

const authController = new AuthController();

// Use .bind(authController) para garantir que o 'this' funcione corretamente
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

// NOVAS ROTAS
router.post('/forgot-password', authController.forgotPassword.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));

router.get('/me', requireAuth, authController.me.bind(authController));
router.post('/logout', requireAuth, authController.logout.bind(authController));

module.exports = router;