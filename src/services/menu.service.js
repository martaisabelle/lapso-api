// Aula 15: Service — onde vive a lógica de negócio
// Não conhece req/res — recebe dados puros, retorna dados puros ou lança erros
import MenuRepository from '../repositories/menu.repository.js';
import ReservaRepository from '../repositories/reserva.repository.js';
import { MenuResponseDTO } from '../dtos/menu.dto.js';

class MenuService {
  static async getAll(tipo) {
    const menus = await MenuRepository.findAll(tipo);
    return menus.map((m) => new MenuResponseDTO(m));
  }

  static async getById(id) {
    const menu = await MenuRepository.findById(id);

    if (!menu) {
      const error = new Error('Menu não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    return new MenuResponseDTO(menu);
  }

  static async create(dados) {
    // REGRA DE NEGÓCIO 1: menu degustação exige no mínimo 5 cursos
    if (dados.tipo === 'degustacao' && dados.numeroCursos < 5) {
      const error = new Error('Um menu degustação deve ter no mínimo 5 cursos.');
      error.statusCode = 422;
      throw error;
    }

    // REGRA DE NEGÓCIO 2: menu executivo não pode ter harmonização
    if (dados.tipo === 'executivo' && dados.precoHarmonizacao) {
      const error = new Error('Menu executivo não oferece harmonização de vinhos.');
      error.statusCode = 422;
      throw error;
    }

    const novoMenu = await MenuRepository.create(dados);
    return new MenuResponseDTO(novoMenu);
  }

  static async update(id, dados) {
    const menu = await MenuRepository.findById(id);

    if (!menu) {
      const error = new Error('Menu não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    const menuAtualizado = await MenuRepository.update(id, dados);
    return new MenuResponseDTO(menuAtualizado);
  }

  static async delete(id) {
    const menu = await MenuRepository.findById(id);

    if (!menu) {
      const error = new Error('Menu não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    // REGRA DE NEGÓCIO 3: não permite deletar menu com reservas ativas
    const reservasVinculadas = await ReservaRepository.findByMenuId(id);
    if (reservasVinculadas.length > 0) {
      const error = new Error(
        `Não é possível remover este menu: há ${reservasVinculadas.length} reserva(s) ativa(s) vinculada(s).`
      );
      error.statusCode = 409;
      throw error;
    }

    await MenuRepository.delete(id);
    return { mensagem: 'Menu removido com sucesso.' };
  }
}

export default MenuService;
