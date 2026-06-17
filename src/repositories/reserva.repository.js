// Aula 22: repositório de reserva com Mongoose
import Reserva from '../models/reserva.model.js';

class ReservaRepository {
  static async findAll(status) {
    if (status) return await Reserva.find({ status });
    return await Reserva.find();
  }

  static async findById(id) {
    return await Reserva.findById(id);
  }

  static async findByMenuId(menuId) {
    return await Reserva.find({ menuId });
  }

  static async create(reservaData) {
    return await Reserva.create({
      ...reservaData,
      status: 'confirmada',
    });
  }

  static async update(id, dadosAtualizados) {
    return await Reserva.findByIdAndUpdate(id, dadosAtualizados, { new: true });
  }

  static async delete(id) {
    const result = await Reserva.findByIdAndDelete(id);
    return result !== null;
  }
}

export default ReservaRepository;