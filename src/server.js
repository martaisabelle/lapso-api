// Aula 8: módulos ES
// Aula 9: separação entre configuração (app.js) e inicialização (server.js)
import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🍃 Lapso API rodando em http://localhost:${PORT}`);
});
