const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/reviews.controller');

// CORREÇÃO AQUI: Usamos { } para extrair apenas a função 'requireAuth' do arquivo
const { requireAuth } = require('../middlewares/auth'); 

// Rota pública (qualquer um vê)
router.get('/', controller.listarPorLivro);

// Rotas privadas (precisa estar logado)
// Note que agora passamos 'requireAuth' em vez de 'authMiddleware'
router.post('/', requireAuth, controller.criarReview);
router.delete('/:id', requireAuth, controller.deletarReview);

module.exports = router;