// Aula 12: Controller — separa a lógica de negócio das rotas (SoC)
// Aula 3: arrow functions, find, findIndex, filter, splice
// Aula 5: spread operator, objetos literais
// Dados em memória por enquanto — banco de dados entra na aula 14

const menus = [
  {
    id: 1,
    tipo: 'degustacao',
    nome: 'Lapso de Cerrado',
    tema: 'Imersão na biodiversidade do Cerrado — o bioma mais ameaçado e menos celebrado do Brasil',
    numeroCursos: 13,
    preco: 980,
    precoHarmonizacao: 1650,
    temporada: 'inverno',
  },
  {
    id: 2,
    tipo: 'executivo',
    nome: 'Raiz',
    tema: 'Releitura da refeição mais brasileira de todas — arroz, feijão e o que a terra dá',
    numeroCursos: 3,
    preco: 195,
    precoHarmonizacao: null,
    temporada: 'ano todo',
  },
];

// GET /api/menus
export const listarMenus = (req, res) => {
  res.status(200).json(menus);
};

// GET /api/menus/:id
export const buscarMenuPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const menu = menus.find((m) => m.id === id);

  if (!menu) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  res.status(200).json(menu);
};

// POST /api/menus
export const criarMenu = (req, res) => {
  const novoMenu = {
    id: menus.length + 1,
    ...req.body,
  };

  menus.push(novoMenu);
  res.status(201).json(novoMenu);
};

// PUT /api/menus/:id
export const atualizarMenu = (req, res) => {
  const id = parseInt(req.params.id);
  const index = menus.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  menus[index] = { ...menus[index], ...req.body, id };
  res.status(200).json(menus[index]);
};

// DELETE /api/menus/:id
export const deletarMenu = (req, res) => {
  const id = parseInt(req.params.id);
  const index = menus.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Menu não encontrado.' });
  }

  menus.splice(index, 1);
  res.status(200).json({ mensagem: 'Menu removido com sucesso.' });
};
