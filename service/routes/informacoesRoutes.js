const express = require('express');
const informacoesController = require('../controllers/informacoesController');

const router = express.Router();

// Rota para criar informações
router.post('/informacoes', informacoesController.createInformacoes);

// Rota para listar informações
router.get('/informacoes', informacoesController.getInformacoes);

// Rota para alterar informações
router.put('/informacoes', informacoesController.updateInformacoes);

module.exports = router;
