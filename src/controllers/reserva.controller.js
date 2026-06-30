// Aula 15: Controller — ponte entre HTTP e a lógica da aplicação
import ReservaService from '../services/reserva.service.js';

class ReservaController {
  static async getAll(req, res, next) {
    try {
      const { status } = req.query;
      const reservas = await ReservaService.getAll(status);
      res.status(200).json(reservas);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const reserva = await ReservaService.getById(id);
      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const novaReserva = await ReservaService.create(req.body);
      res.status(201).json({ sucesso: true, reserva: novaReserva });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const reservaAtualizada = await ReservaService.update(id, req.body);
      res.status(200).json({ sucesso: true, reserva: reservaAtualizada });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const resultado = await ReservaService.delete(id);
      res.status(200).json({ sucesso: true, ...resultado });
    } catch (error) {
      next(error);
    }
  }
}

export default ReservaController;