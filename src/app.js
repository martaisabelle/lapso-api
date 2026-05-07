// Aula 8: módulos ES
// Aula 9: Express como framework HTTP
// Aula 12: rotas separadas com express.Router()
// Aula 16: globalErrorHandler registrado como último middleware
import express from 'express';
import menusRouter from './routes/menu.routes.js';
import reservasRouter from './routes/reserva.routes.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    restaurante: 'Lapso',
    chef: "Dante D'Ávila",
    descricao: 'Alta gastronomia brasileira — menu degustação',
    status: 'online',
  });
});

app.use('/api/menus', menusRouter);
app.use('/api/reservas', reservasRouter);

// Aula 16: DEVE SER O ÚLTIMO middleware registrado
// Captura qualquer erro passado via next(error) de qualquer controller
app.use(globalErrorHandler);

export default app;
