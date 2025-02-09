const db = require('../config/database');

// Criar as informações
const createInformacoes = (totalSenioresRegulares, totalColegios, totalSenioresMacons, callback) => {
  const query = `INSERT INTO informacoes (totalSenioresRegulares, totalColegios, totalSenioresMacons) VALUES (?, ?, ?)`;
  db.run(query, [totalSenioresRegulares, totalColegios, totalSenioresMacons], function (err) {
    callback(err, this.lastID);
  });
};

// Listar as informações
const getInformacoes = (callback) => {
  const query = `SELECT * FROM informacoes ORDER BY id DESC LIMIT 1`;
  db.get(query, [], (err, row) => {
    callback(err, row);
  });
};

// Alterar as informações
const updateInformacoes = (id, totalSenioresRegulares, totalColegios, totalSenioresMacons, callback) => {
  const query = `UPDATE informacoes SET totalSenioresRegulares = ?, totalColegios = ?, totalSenioresMacons = ? WHERE id = ?`;
  db.run(query, [totalSenioresRegulares, totalColegios, totalSenioresMacons, id], function (err) {
    callback(err);
  });
};

module.exports = {
  createInformacoes,
  getInformacoes,
  updateInformacoes,
};
