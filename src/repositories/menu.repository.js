// Aula 15: Repository — única camada que acessa o banco de dados
// Não contém lógica de negócio — apenas executa as "ordens" do Service
// Aula 14: lowdb para persistência
import db from '../config/database.js';

class MenuRepository {
  static async findAll(tipo) {
    await db.read();
    if (tipo) return db.data.menus.filter((m) => m.tipo === tipo);
    return db.data.menus;
  }

  // Retorna o objeto bruto do banco — com TODOS os campos
  static async findById(id) {
    await db.read();
    return db.data.menus.find((m) => m.id === id);
  }

  static async create(menuData) {
    const novoMenu = {
      id: db.data.menus.length + 1,
      ...menuData,
      chef: "Dante D'Ávila",
      ativo: menuData.ativo !== undefined ? menuData.ativo : true,
      restricoesDisponiveis: menuData.restricoesDisponiveis || [],
      etapas: menuData.etapas || [],
      horarios: menuData.horarios || {},
      criadoEm: new Date().toISOString(),
    };

    db.data.menus.push(novoMenu);
    await db.write();
    return novoMenu;
  }

  static async update(id, dadosAtualizados) {
    const index = db.data.menus.findIndex((m) => m.id === id);
    if (index === -1) return null;

    db.data.menus[index] = {
      ...db.data.menus[index],
      ...dadosAtualizados,
      id,
      atualizadoEm: new Date().toISOString(),
    };

    await db.write();
    return db.data.menus[index];
  }

  static async delete(id) {
    const index = db.data.menus.findIndex((m) => m.id === id);
    if (index === -1) return false;

    db.data.menus.splice(index, 1);
    await db.write();
    return true;
  }
}

export default MenuRepository;
