// Aula 8: módulos ES — import/export
// Aula 9: Express como framework HTTP
import express from 'express';

const app = express();

// Aula 9: middleware nativo para interpretar JSON no body das requisições
app.use(express.json());

// Aula 9: primeira rota — GET /
// Aula 2: objetos e JSON
// Aula 4: arrow functions
app.get('/', (req, res) => {
  res.status(200).json({
    restaurante: 'Lapso',
    chef: "Dante D'Ávila",
    descricao: 'Alta gastronomia brasileira — menu degustação',
    status: 'online',
  });
});

// Aula 9: rotas básicas de menus — dados em memória por enquanto
// Aula 3: arrays e métodos de array
// Aula 5: objetos literais e desestruturação
const menus = [
  {
    id: 1,
    nome: 'Lapso de Cerrado',
    tipo: 'degustacao',
    numeroCursos: 13,
    preco: 980,
  },
  {
    id: 2,
    nome: 'Raiz',
    tipo: 'executivo',
    numeroCursos: 3,
    preco: 195,
  },
];

// GET /api/menus — listar todos
app.get('/api/menus', (req, res) => {
  res.status(200).json(menus);
});

// GET /api/menus/:id — buscar por ID
// Aula 6: callback
// Aula 3: find — higher-order function
app.get('/api/menus/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const menu = menus.find((m) => m.id === id);

  if (!menu) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  res.status(200).json(menu);
});

// POST /api/menus — criar novo menu
// Aula 5: spread operator
app.post('/api/menus', (req, res) => {
  const novoMenu = {
    id: menus.length + 1,
    ...req.body,
  };

  menus.push(novoMenu);
  res.status(201).json(novoMenu);
});

// PUT /api/menus/:id — atualizar menu
app.put('/api/menus/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = menus.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  menus[index] = { ...menus[index], ...req.body, id };
  res.status(200).json(menus[index]);
});

// DELETE /api/menus/:id — remover menu
// Aula 3: splice
app.delete('/api/menus/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = menus.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  menus.splice(index, 1);
  res.status(200).json({ mensagem: 'Menu removido.' });
});

export default app;
