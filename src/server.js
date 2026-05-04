// Aula 8: módulos ES — import/export
// Aula 9: HTTP — separação entre configuração (app.js) e inicialização (server.js)
import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🍃 Lapso API rodando em http://localhost:${PORT}`);
});
