const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Middleware para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para retornar os dados dos pokémons
app.get('/api/pokemons', (req, res) => {
  fs.readFile(path.join(__dirname, 'pokemons.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erro ao ler o arquivo JSON.');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
