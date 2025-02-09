const db = require('../config/database');

// Função para criar um novo download
const createDownload = (descricao, categoria, urlDocumento, callback) => {
  const stmt = db.prepare('INSERT INTO downloads (descricao, categoria, urlDocumento) VALUES (?, ?, ?)');
  stmt.run(descricao, categoria, urlDocumento, function (err) {
    callback(err, this.lastID);
  });
  stmt.finalize();
};

// Função para obter todos os downloads
const getAllDownloads = (callback) => {
  db.all('SELECT * FROM downloads', [], (err, rows) => {
    callback(err, rows);
  });
};

// Função para obter um download por ID
const getDownloadById = (id, callback) => {
  db.get('SELECT * FROM downloads WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

// Função para atualizar um download por ID
const updateDownload = (id, descricao, categoria, urlDocumento, callback) => {
  const stmt = db.prepare('UPDATE downloads SET descricao = ?, categoria = ?, urlDocumento = ? WHERE id = ?');
  stmt.run(descricao, categoria, urlDocumento, id, function (err) {
    callback(err, this.changes);
  });
  stmt.finalize();
};

// Função para excluir um download por ID
const deleteDownload = (id, callback) => {
  const stmt = db.prepare('DELETE FROM downloads WHERE id = ?');
  stmt.run(id, function (err) {
    callback(err, this.changes);
  });
  stmt.finalize();
};

module.exports = {
  createDownload,
  getAllDownloads,
  getDownloadById,
  updateDownload,
  deleteDownload,
};
