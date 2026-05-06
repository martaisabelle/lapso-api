// Aula 15: Repository — única camada que acessa o banco de dados
import db from '../config/database.js';

class ReservaRepository {
  static async findAll(status) {
    await db.read();
    if (status) return db.data.reservas.filter((r) => r.status === status);
    return db.data.reservas;
  }

  static async findById(id) {
    await db.read();
    return db.data.reservas.find((r) => r.id === id);
  }

  // Usado pelo MenuService para checar reservas antes de deletar um menu
  static async findByMenuId(menuId) {
    await db.read();
    return db.data.reservas.filter((r) => r.menuId === menuId);
  }

  static async create(reservaData) {
    const novaReserva = {
      id: db.data.reservas.length + 1,
      ...reservaData,
      status: 'confirmada',
      criadaEm: new Date().toISOString(),
    };

    db.data.reservas.push(novaReserva);
    await db.write();
    return novaReserva;
  }

  static async update(id, dadosAtualizados) {
    const index = db.data.reservas.findIndex((r) => r.id === id);
    if (index === -1) return null;

    db.data.reservas[index] = {
      ...db.data.reservas[index],
      ...dadosAtualizados,
      id,
      atualizadaEm: new Date().toISOString(),
    };

    await db.write();
    return db.data.reservas[index];
  }

  static async delete(id) {
    const index = db.data.reservas.findIndex((r) => r.id === id);
    if (index === -1) return false;

    db.data.reservas.splice(index, 1);
    await db.write();
    return true;
  }
}

export default ReservaRepository;
