// Aula 15: Service — lógica de negócio das reservas
import ReservaRepository from '../repositories/reserva.repository.js';
import MenuRepository from '../repositories/menu.repository.js';
import { ReservaResponseDTO } from '../dtos/reserva.dto.js';

class ReservaService {
  static async getAll(status) {
    const reservas = await ReservaRepository.findAll(status);
    return reservas.map((r) => new ReservaResponseDTO(r));
  }

  static async getById(id) {
    const reserva = await ReservaRepository.findById(id);

    if (!reserva) {
      const error = new Error('Reserva não encontrada.');
      error.statusCode = 404;
      throw error;
    }

    return new ReservaResponseDTO(reserva);
  }

  static async create(dados) {
    // REGRA DE NEGÓCIO 1: o menu deve existir e estar ativo
    const menu = await MenuRepository.findById(dados.menuId);
    if (!menu) {
      const error = new Error('Menu não encontrado. Verifique o menuId informado.');
      error.statusCode = 404;
      throw error;
    }

    if (!menu.ativo) {
      const error = new Error('Este menu não está disponível para reservas no momento.');
      error.statusCode = 400;
      throw error;
    }

    // REGRA DE NEGÓCIO 2: não pode reservar em data passada
    const dataReserva = new Date(dados.data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataReserva < hoje) {
      const error = new Error('Não é possível fazer reservas para datas passadas.');
      error.statusCode = 422;
      throw error;
    }

    // REGRA DE NEGÓCIO 3: menu executivo só funciona de segunda a sexta
    if (menu.tipo === 'executivo') {
      const diaSemana = dataReserva.getDay();
      if (diaSemana === 0 || diaSemana === 6) {
        const error = new Error('O Menu Executivo "Raiz" é servido apenas de segunda a sexta-feira.');
        error.statusCode = 422;
        throw error;
      }
    }

    // REGRA DE NEGÓCIO 4: harmonização só disponível no menu degustação
    if (dados.harmonizacao && menu.tipo !== 'degustacao') {
      const error = new Error('A harmonização de vinhos está disponível apenas no Menu Degustação.');
      error.statusCode = 422;
      throw error;
    }

    // Calcula o valor total automaticamente
    const valorTotal = dados.harmonizacao && menu.precoHarmonizacao
      ? menu.precoHarmonizacao * dados.numeroPessoas
      : menu.preco * dados.numeroPessoas;

    const dadosCompletos = {
      ...dados,
      nomeMenu: menu.nome,
      tipoMenu: menu.tipo,
      harmonizacao: dados.harmonizacao || false,
      restricoes: dados.restricoes || null,
      valorTotal,
    };

    const novaReserva = await ReservaRepository.create(dadosCompletos);
    return new ReservaResponseDTO(novaReserva);
  }

  static async update(id, dados) {
    const reserva = await ReservaRepository.findById(id);

    if (!reserva) {
      const error = new Error('Reserva não encontrada.');
      error.statusCode = 404;
      throw error;
    }

    const reservaAtualizada = await ReservaRepository.update(id, dados);
    return new ReservaResponseDTO(reservaAtualizada);
  }

  static async delete(id) {
    const reserva = await ReservaRepository.findById(id);

    if (!reserva) {
      const error = new Error('Reserva não encontrada.');
      error.statusCode = 404;
      throw error;
    }

    await ReservaRepository.delete(id);
    return { mensagem: 'Reserva cancelada com sucesso.' };
  }
}

export default ReservaService;
