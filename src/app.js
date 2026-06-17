import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import menusRouter from './routes/menu.routes.js';
import reservasRouter from './routes/reserva.routes.js';
import webRouter from './routes/web.routes.js';
import authRouter from './routes/auth.routes.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

// Aula 18: necessário para obter __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Aula 18: arquivos estáticos — CSS acessível em /css/style.css
app.use(express.static(path.join(__dirname, '../public')));

// Aula 18: PUG como view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Aula 17: documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.status(200).json({
    restaurante: 'Lapso',
    chef: "Dante D'Ávila",
    descricao: 'Alta gastronomia brasileira — menu degustação',
    status: 'online',
    paginas: {
      menus: '/menus-view',
      reservas: '/reservas-view',
    },
  });
});

// Rotas da API (JSON)
app.use('/api/auth', authRouter);
app.use('/api/menus', menusRouter);
app.use('/api/reservas', reservasRouter);

// Aula 18: rotas web (HTML renderizado pelo servidor)
app.use('/', webRouter);

// Aula 16: deve ser o último middleware
app.use(globalErrorHandler);

export default app;