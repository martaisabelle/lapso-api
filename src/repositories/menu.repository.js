// Aula 22: repositório de menu com Mongoose
import Menu from '../models/menu.model.js';

class MenuRepository {
  static async findAll(tipo) {
    if (tipo) return await Menu.find({ tipo });
    return await Menu.find();
  }

  static async findById(id) {
    return await Menu.findById(id);
  }

  static async create(menuData) {
    return await Menu.create({
      ...menuData,
      chef: "Dante D'Ávila",
      ativo: menuData.ativo !== undefined ? menuData.ativo : true,
      restricoesDisponiveis: menuData.restricoesDisponiveis || [],
      etapas: menuData.etapas || [],
    });
  }

  static async update(id, dadosAtualizados) {
    return await Menu.findByIdAndUpdate(id, dadosAtualizados, { new: true });
  }

  static async delete(id) {
    const result = await Menu.findByIdAndDelete(id);
    return result !== null;
  }
}

export default MenuRepository;