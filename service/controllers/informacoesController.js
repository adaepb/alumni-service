const informacoesModel = require('../models/informacoesModel');

// Criar informações
const createInformacoes = (req, res) => {
  const { totalSenioresRegulares, totalColegios, totalSenioresMacons } = req.body;

  if (!totalSenioresRegulares || !totalColegios || !totalSenioresMacons) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  informacoesModel.createInformacoes(totalSenioresRegulares, totalColegios, totalSenioresMacons, (err, lastID) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar as informações.' });
    }
    return res.status(201).json({ message: 'Informações criadas com sucesso.', id: lastID });
  });
};

// Listar informações
const getInformacoes = (req, res) => {
  informacoesModel.getInformacoes((err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao listar as informações.' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Nenhuma informação encontrada.' });
    }
    return res.status(200).json(row);
  });
};

// Alterar informações
const updateInformacoes = (req, res) => {
  const { id, totalSenioresRegulares, totalColegios, totalSenioresMacons } = req.body;

  if (!id || !totalSenioresRegulares || !totalColegios || !totalSenioresMacons) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  informacoesModel.updateInformacoes(id, totalSenioresRegulares, totalColegios, totalSenioresMacons, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar as informações.' });
    }
    return res.status(200).json({ message: 'Informações atualizadas com sucesso.' });
  });
};

module.exports = {
  createInformacoes,
  getInformacoes,
  updateInformacoes,
};
