// Aula 18: controller de autenticação
import AuthService from '../services/auth.service.js';
import UserDTO from '../dtos/user.dto.js';

class AuthController {
  static async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(new UserDTO(user));
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { token, user } = await AuthService.login(req.body);
      res.status(200).json({ token, user: new UserDTO(user) });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;