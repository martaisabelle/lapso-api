// Aula 8: módulos ES
// Aula 9: Express como framework HTTP
// Aula 12: rotas separadas com express.Router()
import express from 'express';
import menusRouter from './routes/menu.routes.js';
import reservasRouter from './routes/reserva.routes.js';

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

// Aula 12: montagem das rotas com prefixo
app.use('/api/menus', menusRouter);
app.use('/api/reservas', reservasRouter);

export default app;
