// Aula 13: middleware genérico — define COMO a API reage a erros de validação
// Reutilizável para qualquer entidade: menus, reservas, etc.
import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Dados inválidos.',
      erros: erros.array(),
    });
  }

  next();
};
