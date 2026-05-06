// Aula 15: DTO — Data Transfer Object
// Define o "contrato" público de uma Reserva
// valorTotal é calculado pelo Service — o cliente recebe o resultado pronto
export class ReservaResponseDTO {
  constructor(reserva) {
    this.id = reserva.id;
    this.nomeCliente = reserva.nomeCliente;
    this.email = reserva.email;
    this.telefone = reserva.telefone;
    this.data = reserva.data;
    this.horario = reserva.horario;
    this.numeroPessoas = reserva.numeroPessoas;
    this.menuId = reserva.menuId;
    this.nomeMenu = reserva.nomeMenu;
    this.tipoMenu = reserva.tipoMenu;
    this.harmonizacao = reserva.harmonizacao;
    this.restricoes = reserva.restricoes;
    this.valorTotal = reserva.valorTotal;
    this.status = reserva.status;
    this.criadaEm = reserva.criadaEm;
    if (reserva.atualizadaEm) this.atualizadaEm = reserva.atualizadaEm;
  }
}
