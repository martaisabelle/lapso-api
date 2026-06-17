// Aula 21: modelo de reserva com Mongoose
import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  nomeCliente: {
    type: String,
    required: [true, 'O nome do cliente é obrigatório.'],
    minlength: [3, 'O nome deve ter pelo menos 3 caracteres.'],
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
  },
  telefone: {
    type: String,
    required: [true, 'O telefone é obrigatório.'],
  },
  data: {
    type: String,
    required: [true, 'A data é obrigatória.'],
  },
  horario: {
    type: String,
    required: [true, 'O horário é obrigatório.'],
  },
  numeroPessoas: {
    type: Number,
    required: [true, 'O número de pessoas é obrigatório.'],
    min: [1, 'Mínimo de 1 pessoa.'],
    max: [12, 'Máximo de 12 pessoas.'],
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: [true, 'O menuId é obrigatório.'],
  },
  harmonizacao: {
    type: Boolean,
    default: false,
  },
  restricoes: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['confirmada', 'cancelada', 'pendente'],
    default: 'confirmada',
  },
}, {
  timestamps: true,
});

const Reserva = mongoose.model('Reserva', reservaSchema);

export default Reserva;