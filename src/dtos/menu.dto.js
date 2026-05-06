// Aula 15: DTO — Data Transfer Object
// Define o "contrato" público de um Menu
// Garante que independente de como o dado está no banco,
// o cliente SEMPRE recebe esta estrutura previsível
export class MenuResponseDTO {
  constructor(menu) {
    this.id = menu.id;
    this.tipo = menu.tipo;
    this.nome = menu.nome;
    this.tema = menu.tema;
    this.chef = menu.chef;
    this.numeroCursos = menu.numeroCursos;
    this.duracaoEstimadaMinutos = menu.duracaoEstimadaMinutos;
    this.preco = menu.preco;
    this.precoHarmonizacao = menu.precoHarmonizacao;
    this.temporada = menu.temporada;
    this.ativo = menu.ativo;
    this.restricoesDisponiveis = menu.restricoesDisponiveis;
    this.etapas = menu.etapas;
    this.horarios = menu.horarios;
    this.criadoEm = menu.criadoEm;
    if (menu.atualizadoEm) this.atualizadoEm = menu.atualizadoEm;
  }
}
