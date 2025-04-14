const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static('public'));

// Rota que retorna todos os pokémons
app.get('/api/pokemons', (req, res) => {
  fs.readFile(path.join(__dirname, 'public/data/pokemons.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler o arquivo');
    res.json(JSON.parse(data));
  });
});

// Rota que retorna um pokémon por ID
app.get('/api/pokemon/:id', (req, res) => {
  fs.readFile(path.join(__dirname, 'public/data/pokemons.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler o arquivo');
    const pokemons = JSON.parse(data);
    const pokemon = pokemons.find(p => p.imagem.includes(`/${req.params.id}.png`));
    if (!pokemon) return res.status(404).send('Pokémon não encontrado');
    res.json({
      id: req.params.id,
      nome: pokemon.nome,
      habilidades: pokemon.habilidades,
      evolucao: pokemon.proxima_evolucao
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
