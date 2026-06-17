// Aula 8: módulos ES
// Aula 9: separação entre configuração (app.js) e inicialização (server.js)
// Aula 21: conecta ao MongoDB antes de iniciar o servidor
import 'dotenv/config';
import app from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Lapso API rodando em http://localhost:${PORT}`);
  });
});