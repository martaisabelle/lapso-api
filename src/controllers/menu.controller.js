// Aula 15: Controller — ponte entre HTTP e a lógica da aplicação
// NUNCA contém regra de negócio — só extrai dados do req, chama o Service e formata res
import MenuService from '../services/menu.service.js';

class MenuController {
  static async getAll(req, res, next) {
    try {
      const { tipo } = req.query;
      const menus = await MenuService.getAll(tipo);
      res.status(200).json(menus);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const menu = await MenuService.getById(id);
      res.status(200).json(menu);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const novoMenu = await MenuService.create(req.body);
      res.status(201).json({ sucesso: true, menu: novoMenu });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const menuAtualizado = await MenuService.update(id, req.body);
      res.status(200).json({ sucesso: true, menu: menuAtualizado });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const resultado = await MenuService.delete(id);
      res.status(200).json({ sucesso: true, ...resultado });
    } catch (error) {
      next(error);
    }
  }
}

export default MenuController;