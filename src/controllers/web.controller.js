// Aula 18: WebController
import MenuService from '../services/menu.service.js';
import ReservaService from '../services/reserva.service.js';

class WebController {
  static async listMenusPage(req, res, next) {
    try {
      const menus = await MenuService.getAll();
      res.render('menus', {
        title: 'Cardápio — Lapso',
        menus,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listReservasPage(req, res, next) {
    try {
      const reservas = await ReservaService.getAll();

      const reservasComMenu = await Promise.all(
        reservas.map(async (reserva) => {
          try {
            const menu = await MenuService.getById(reserva.menuId.toString());
            const valorTotal = reserva.harmonizacao && menu.precoHarmonizacao
              ? menu.precoHarmonizacao * reserva.numeroPessoas
              : menu.preco * reserva.numeroPessoas;
            return { ...reserva, nomeMenu: menu.nome, tipoMenu: menu.tipo, valorTotal };
          } catch {
            return { ...reserva, nomeMenu: 'Menu não encontrado', valorTotal: 0 };
          }
        })
      );

      res.render('reservas', {
        title: 'Reservas — Lapso',
        reservas: reservasComMenu,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default WebController;