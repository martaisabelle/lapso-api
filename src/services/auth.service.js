// Aula 18: service de autenticação com JWT
// Aula 19: bcrypt para hash de senhas
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';

class AuthService {
  static async register(userData) {
    const existente = await userRepository.findByEmail(userData.email);
    if (existente) throw new Error('Email já cadastrado.');

    const senhaHash = await bcrypt.hash(userData.senha, 10);
    return await userRepository.create({
      ...userData,
      senha: senhaHash,
    });
  }

  static async login({ email, senha }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Credenciais inválidas.');

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) throw new Error('Credenciais inválidas.');

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, user };
  }
}

export default AuthService;