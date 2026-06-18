// Aula 13: validators/ define O QUE validar — específico para reservas
import { body, param } from 'express-validator';
import mongoose from 'mongoose';

export const createReservaValidation = [
  body('nomeCliente')
    .trim()
    .notEmpty().withMessage('O nome do cliente é obrigatório.')
    .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres.'),

  body('email')
    .isEmail().withMessage('E-mail inválido.'),

  body('telefone')
    .trim()
    .notEmpty().withMessage('O telefone é obrigatório.'),

  body('data')
    .notEmpty().withMessage('A data é obrigatória.')
    .isISO8601().withMessage('A data deve estar no formato YYYY-MM-DD.'),

  body('horario')
    .notEmpty().withMessage('O horário é obrigatório.')
    .matches(/^\d{2}:\d{2}$/).withMessage('O horário deve estar no formato HH:MM.'),

  body('numeroPessoas')
    .isInt({ min: 1, max: 12 }).withMessage('O número de pessoas deve ser entre 1 e 12.'),

  body('menuId')
    .notEmpty().withMessage('O menuId é obrigatório.')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('O menuId deve ser um ID válido.'),

  body('harmonizacao')
    .optional()
    .isBoolean().withMessage('O campo harmonizacao deve ser verdadeiro ou falso.'),

  body('restricoes')
    .optional()
    .isString().withMessage('Restrições alimentares devem ser informadas como texto.'),
];

export const reservaIdValidation = [
  param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('O ID deve ser um MongoDB ObjectId válido.'),
];