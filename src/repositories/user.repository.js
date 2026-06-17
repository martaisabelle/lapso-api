// Aula 22: repositório de usuário com Mongoose
import User from '../models/user.model.js';

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findAll() {
    return await User.find();
  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();