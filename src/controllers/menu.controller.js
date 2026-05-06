// Aula 12: Controller — lógica separada das rotas
// Aula 14: persistência com lowdb — dados salvos no db.json
import db from '../config/database.js';

// GET /api/menus
export const listarMenus = (req, res) => {
  const { tipo } = req.query;

  // Aula 3: filter — higher-order function
  const resultado = tipo
    ? db.data.menus.filter((m) => m.tipo === tipo)
    : db.data.menus;

  res.status(200).json(resultado);
};

// GET /api/menus/:id
export const buscarMenuPorId = (req, res) => {
  const id = parseInt(req.params.id);

  // Aula 3: find — higher-order function
  const menu = db.data.menus.find((m) => m.id === id);

  if (!menu) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  res.status(200).json(menu);
};

// POST /api/menus
export const criarMenu = async (req, res) => {
  // Aula 5: spread operator
  const novoMenu = {
    id: db.data.menus.length + 1,
    ...req.body,
    chef: "Dante D'Ávila",
    ativo: req.body.ativo !== undefined ? req.body.ativo : true,
    criadoEm: new Date().toISOString(),
  };

  // Aula 14: push no array + write salva no db.json
  db.data.menus.push(novoMenu);
  await db.write();

  res.status(201).json(novoMenu);
};

// PUT /api/menus/:id
export const atualizarMenu = async (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.data.menus.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  db.data.menus[index] = {
    ...db.data.menus[index],
    ...req.body,
    id,
    atualizadoEm: new Date().toISOString(),
  };

  await db.write();
  res.status(200).json(db.data.menus[index]);
};

// DELETE /api/menus/:id
export const deletarMenu = async (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.data.menus.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  // Aula 3: splice — remove elemento do array
  db.data.menus.splice(index, 1);
  await db.write();

  res.status(200).json({ mensagem: 'Menu removido com sucesso.' });
};
