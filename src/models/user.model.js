// Aula 21: modelo de usuário com Mongoose
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
    minlength: [3, 'O nome deve ter pelo menos 3 caracteres.'],
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true,
  },
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;