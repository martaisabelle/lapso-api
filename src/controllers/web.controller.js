// Aula 18: WebController
// Reutiliza os mesmos Services da API JSON para alimentar as views PUG
// Demonstra o poder da arquitetura em camadas:
// a lógica de negócio não muda, só a forma de resposta (JSON ou HTML)
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

      // Busca o menu de cada reserva e calcula o valor total
      const reservasComMenu = await Promise.all(
        reservas.map(async (reserva) => {
          try {
            const menu = await MenuService.getById(reserva.menuId.toString());
            const precoBase = menu.preco * reserva.numeroPessoas;
            const precoHarmonizacao = reserva.harmonizacao && menu.precoHarmonizacao
              ? menu.precoHarmonizacao * reserva.numeroPessoas
              : 0;
            const valorTotal = precoBase + precoHarmonizacao;
            return { ...reserva.toObject(), nomeMenu: menu.nome, tipoMenu: menu.tipo, valorTotal };
          } catch {
            return { ...reserva.toObject(), nomeMenu: 'Menu não encontrado', valorTotal: 0 };
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