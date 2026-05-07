// Aula 16: middleware global de erros
// 4 parâmetros — o Express identifica automaticamente como handler de erro
// Deve ser o último app.use() no app.js

export const globalErrorHandler = (error, req, res, next) => {
  console.error('ERRO DETECTADO:', error.message);
  console.error('Stack:', error.stack);

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: error.statusCode
      ? error.message
      : 'Ocorreu um erro interno no servidor.',
  });
};