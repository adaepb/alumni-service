const express = require('express');
const downloadController = require('../controllers/downloadController');

const router = express.Router();

// Rota para criar um novo download
router.post('/downloads', downloadController.createDownload);

router.post('/downloads/lote', downloadController.createDownloadsLote);

// Rota para obter todos os downloads
router.get('/downloads', downloadController.getAllDownloads);

// Rota para obter um download por ID
router.get('/downloads/:id', downloadController.getDownloadById);

// Rota para atualizar um download
router.put('/downloads/:id', downloadController.updateDownload);

// Rota para excluir um download
router.delete('/downloads/:id', downloadController.deleteDownload);

module.exports = router;
