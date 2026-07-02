const Notificacion = require('../models/Notificacion');

// Listar mis notificaciones (más recientes primero)
const listarMias = async (req, res) => {
  try {
    const notificaciones = await Notificacion.findAll({
      where: { id_usuario: req.usuario.id_usuario },
      order: [['createdAt', 'DESC']],
    });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar notificaciones', detalle: error.message });
  }
};

// Marcar una notificación como leída
const marcarLeida = async (req, res) => {
  try {
    const notificacion = await Notificacion.findByPk(req.params.id);
    if (!notificacion) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }
    await notificacion.update({ leida: true });
    res.json(notificacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al marcar notificación', detalle: error.message });
  }
};

// Crear una notificación (uso interno del sistema, ej: cuando se aprueba una solicitud)
const crear = async (req, res) => {
  try {
    const nuevaNotificacion = await Notificacion.create(req.body);
    res.status(201).json(nuevaNotificacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear notificación', detalle: error.message });
  }
};

module.exports = { listarMias, marcarLeida, crear };