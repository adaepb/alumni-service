const express = require('express');
const bodyParser = require('body-parser');
const informacoesRoutes = require('./routes/informacoesRoutes');
const downloadRoutes = require('./routes/downloadRoutes');

const app = express();
const port = 3000;

// Middleware para tratar requisições JSON
app.use(bodyParser.json());

// Usar as rotas de downloads
app.use('/api', downloadRoutes);
app.use('/api', informacoesRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
