const express = require("express");
const router = express.Router();

const LivrosController = require("../controllers/livros.controller");
const livrosController = new LivrosController();
const { validarParamId } = require("../middlewares/validar/livros.validar");

// NOVO: Importar middleware de upload
const upload = require("../middlewares/upload");

router.get("/", livrosController.listarLivros.bind(livrosController));
router.get("/:id", validarParamId, livrosController.buscarLivroPorId.bind(livrosController));

// NOVO: upload.single('imagem') nas rotas POST e PUT
router.post("/", upload.single('imagem'), livrosController.criarLivro.bind(livrosController));
router.put("/:id", validarParamId, upload.single('imagem'), livrosController.atualizarLivro.bind(livrosController));

router.delete("/:id", validarParamId, livrosController.removerLivro.bind(livrosController));

module.exports = router;