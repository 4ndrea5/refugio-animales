const jwt = require('jsonwebtoken');

// Verifica que el usuario esté logueado (token válido)
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No se proporcionó un token' });
  }

  const token = authHeader.split(' ')[1]; // formato: "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // guarda id_usuario y rol para usarlos después
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Verifica que el usuario tenga uno de los roles permitidos
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
    }
    next();
  };
};

module.exports = { verificarToken, verificarRol };