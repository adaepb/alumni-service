const downloadModel = require('../models/downloadModel');

// Criar um novo download
const createDownload = (req, res) => {
  const { descricao, categoria, urlDocumento } = req.body;
  downloadModel.createDownload(descricao, categoria, urlDocumento, (err, lastID) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao adicionar o download' });
    }
    res.status(201).json({ id: lastID, descricao, categoria, urlDocumento });
  });
};

const createDownloadsLote = (req, res) => {
    const downloads = req.body;
  
    if (!Array.isArray(downloads)) {
      return res.status(400).json({ error: 'A requisição deve conter um array de downloads.' });
    }
  
    const errors = [];
    const results = [];
  
    downloads.forEach((download, index) => {
      const { descricao, categoria, urlDocumento } = download;
      if (!descricao || !categoria || !urlDocumento) {
        errors.push(`Erro no item ${index + 1}: Falta de informações obrigatórias.`);
        return;
      }
  
      downloadModel.createDownload(descricao, categoria, urlDocumento, (err, lastID) => {
        if (err) {
          errors.push(`Erro ao adicionar o download ${index + 1}: ${err.message}`);
        } else {
          results.push({ id: lastID, descricao, categoria, urlDocumento });
        }
  
        // Se for o último item, retornamos a resposta com sucesso ou erro
        if (downloads.length === results.length + errors.length) {
          if (errors.length) {
            return res.status(500).json({
              message: 'Alguns downloads não foram adicionados.',
              errors,
              results,
            });
          }
          return res.status(201).json({ message: 'Todos os downloads foram adicionados com sucesso.', results });
        }
      });
    });
  };

// Obter todos os downloads
const getAllDownloads = (req, res) => {
  downloadModel.getAllDownloads((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar downloads' });
    }
    res.status(200).json(rows);
  });
};

// Obter um download por ID
const getDownloadById = (req, res) => {
  const { id } = req.params;
  downloadModel.getDownloadById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar o download' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Download não encontrado' });
    }
    res.status(200).json(row);
  });
};

// Atualizar um download
const updateDownload = (req, res) => {
  const { id } = req.params;
  const { descricao, categoria, urlDocumento } = req.body;

  downloadModel.updateDownload(id, descricao, categoria, urlDocumento, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar o download' });
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Download não encontrado' });
    }
    res.status(200).json({ id, descricao, categoria, urlDocumento });
  });
};

// Excluir um download
const deleteDownload = (req, res) => {
  const { id } = req.params;
  downloadModel.deleteDownload(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir o download' });
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Download não encontrado' });
    }
    res.status(200).json({ message: 'Download excluído com sucesso' });
  });
};

module.exports = {
  createDownload,
  createDownloadsLote,
  getAllDownloads,
  getDownloadById,
  updateDownload,
  deleteDownload,
};
