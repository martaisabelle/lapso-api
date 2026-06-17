// Aula 21: modelo de menu com Mongoose
import mongoose from 'mongoose';

const etapaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  tipo: { type: String, required: true },
  prato: { type: String, required: true },
});

const menuSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
  },
  tipo: {
    type: String,
    enum: ['degustacao', 'executivo'],
    required: [true, 'O tipo é obrigatório.'],
  },
  tema: { type: String },
  chef: { type: String },
  numeroCursos: { type: Number },
  duracaoEstimadaMinutos: { type: Number },
  preco: { type: Number, required: [true, 'O preço é obrigatório.'] },
  precoHarmonizacao: { type: Number },
  temporada: { type: String },
  ativo: { type: Boolean, default: true },
  restricoesDisponiveis: [{ type: String }],
  etapas: [etapaSchema],
}, {
  timestamps: true,
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;