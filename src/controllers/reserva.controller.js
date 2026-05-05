// Aula 12: Controller — lógica separada das rotas
// Dados em memória por enquanto

const reservas = [];

// GET /api/reservas
export const listarReservas = (req, res) => {
  res.status(200).json(reservas);
};

// GET /api/reservas/:id
export const buscarReservaPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const reserva = reservas.find((r) => r.id === id);

  if (!reserva) {
    return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
  }

  res.status(200).json(reserva);
};

// POST /api/reservas
export const criarReserva = (req, res) => {
  const novaReserva = {
    id: reservas.length + 1,
    ...req.body,
    status: 'confirmada',
    criadaEm: new Date().toISOString(),
  };

  reservas.push(novaReserva);
  res.status(201).json(novaReserva);
};

// PUT /api/reservas/:id
export const atualizarReserva = (req, res) => {
  const id = parseInt(req.params.id);
  const index = reservas.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
  }

  reservas[index] = { ...reservas[index], ...req.body, id };
  res.status(200).json(reservas[index]);
};

// DELETE /api/reservas/:id
export const deletarReserva = (req, res) => {
  const id = parseInt(req.params.id);
  const index = reservas.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
  }

  reservas.splice(index, 1);
  res.status(200).json({ mensagem: 'Reserva cancelada com sucesso.' });
};
