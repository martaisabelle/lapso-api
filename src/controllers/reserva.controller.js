// Aula 12: Controller — lógica separada das rotas
// Aula 14: persistência com lowdb
import db from '../config/database.js';

// GET /api/reservas
export const listarReservas = (req, res) => {
  const { status } = req.query;

  const resultado = status
    ? db.data.reservas.filter((r) => r.status === status)
    : db.data.reservas;

  res.status(200).json(resultado);
};

// GET /api/reservas/:id
export const buscarReservaPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const reserva = db.data.reservas.find((r) => r.id === id);

  if (!reserva) {
    return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
  }

  res.status(200).json(reserva);
};

// POST /api/reservas
export const criarReserva = async (req, res) => {
  const { menuId } = req.body;

  // Verifica se o menu existe
  const menu = db.data.menus.find((m) => m.id === parseInt(menuId));
  if (!menu) {
    return res.status(404).json({ mensagem: 'Menu não encontrado. Verifique o menuId informado.' });
  }

  // Calcula o valor total automaticamente
  const valorTotal = req.body.harmonizacao && menu.precoHarmonizacao
    ? menu.precoHarmonizacao * req.body.numeroPessoas
    : menu.preco * req.body.numeroPessoas;

  const novaReserva = {
    id: db.data.reservas.length + 1,
    ...req.body,
    menuId: parseInt(menuId),
    nomeMenu: menu.nome,
    tipoMenu: menu.tipo,
    harmonizacao: req.body.harmonizacao || false,
    restricoes: req.body.restricoes || null,
    valorTotal,
    status: 'confirmada',
    criadaEm: new Date().toISOString(),
  };

  db.data.reservas.push(novaReserva);
  await db.write();

  res.status(201).json(novaReserva);
};

// PUT /api/reservas/:id
export const atualizarReserva = async (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.data.reservas.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
  }

  db.data.reservas[index] = {
    ...db.data.reservas[index],
    ...req.body,
    id,
    atualizadaEm: new Date().toISOString(),
  };

  await db.write();
  res.status(200).json(db.data.reservas[index]);
};

// DELETE /api/reservas/:id
export const deletarReserva = async (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.data.reservas.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
  }

  db.data.reservas.splice(index, 1);
  await db.write();

  res.status(200).json({ mensagem: 'Reserva cancelada com sucesso.' });
};
