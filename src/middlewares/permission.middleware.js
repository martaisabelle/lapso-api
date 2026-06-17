// Aula 19: middleware de autorização por papéis (RBAC)
const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        message: 'Acesso negado. Permissões insuficientes.',
      });
    }
    next();
  };
};

export default checkRole;