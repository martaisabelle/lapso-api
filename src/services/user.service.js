// Aula 22: serviço de usuário
import userRepository from '../repositories/user.repository.js';

class UserService {
  async getAll() {
    return await userRepository.findAll();
  }

  async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('Usuário não encontrado.');
    return user;
  }

  async create(userData) {
    const existente = await userRepository.findByEmail(userData.email);
    if (existente) throw new Error('Email já cadastrado.');
    return await userRepository.create(userData);
  }

  async update(id, userData) {
    const user = await userRepository.update(id, userData);
    if (!user) throw new Error('Usuário não encontrado.');
    return user;
  }

  async delete(id) {
    const user = await userRepository.delete(id);
    if (!user) throw new Error('Usuário não encontrado.');
    return user;
  }
}

export default new UserService();