const sqlite3 = require('sqlite3').verbose();

// Cria e conecta ao banco de dados SQLite3
const db = new sqlite3.Database('./alumnipb.sqlite3', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    // Criação das tabelas se não existirem
    createTables();
  }
});

// Função para criar as tabelas necessárias
const createTables = () => {
  db.serialize(() => {
    // Criação da tabela de downloads
    db.run(`
      CREATE TABLE IF NOT EXISTS downloads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        categoria TEXT NOT NULL,
        urlDocumento TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de downloads:', err.message);
      }
    });

    // Criação da tabela de informações
    db.run(`
      CREATE TABLE IF NOT EXISTS informacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        totalSenioresRegulares INTEGER NOT NULL,
        totalColegios INTEGER NOT NULL,
        totalSenioresMacons INTEGER NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de informacoes:', err.message);
      }
    });
  });
};

// Fechar o banco de dados ao finalizar o processo
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err.message);
    } else {
      console.log('Banco de dados fechado.');
    }
    process.exit(0);
  });
});

module.exports = db;
