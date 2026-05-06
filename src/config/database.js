// Aula 14: persistência com lowdb
// Aula 7: top-level await habilitado pelo "type": "module" no package.json
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Estrutura padrão do banco — garante que as coleções existam
const defaultData = { menus: [], reservas: [] };

const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

// Lê o arquivo db.json ao inicializar o servidor
await db.read();

export default db;
