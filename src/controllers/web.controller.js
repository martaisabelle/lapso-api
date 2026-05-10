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
      // res.render() renderiza o template PUG com os dados passados
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
      res.render('reservas', {
        title: 'Reservas — Lapso',
        reservas,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default WebController;
