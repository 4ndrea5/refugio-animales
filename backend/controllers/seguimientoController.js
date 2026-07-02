const SeguimientoPostAdopcion = require('../models/SeguimientoPostAdopcion');
const Adopcion = require('../models/Adopcion');
const Usuario = require('../models/Usuario');

// Listar seguimientos de una adopción específica
const listarPorAdopcion = async (req, res) => {
  try {
    const seguimientos = await SeguimientoPostAdopcion.findAll({
      where: { id_adopcion: req.params.idAdopcion },
      include: [{ model: Usuario, as: 'responsable', attributes: ['id_usuario', 'nombre', 'apellido'] }],
      order: [['fecha_seguimiento', 'DESC']],
    });
    res.json(seguimientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar seguimientos', detalle: error.message });
  }
};

// Crear un nuevo seguimiento
const crear = async (req, res) => {
  try {
    const adopcion = await Adopcion.findByPk(req.body.id_adopcion);
    if (!adopcion) {
      return res.status(404).json({ error: 'Adopción no encontrada' });
    }

    const nuevoSeguimiento = await SeguimientoPostAdopcion.create({
      ...req.body,
      id_responsable: req.usuario.id_usuario,
    });
    res.status(201).json(nuevoSeguimiento);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear seguimiento', detalle: error.message });
  }
};

// Actualizar un seguimiento
const actualizar = async (req, res) => {
  try {
    const seguimiento = await SeguimientoPostAdopcion.findByPk(req.params.id);
    if (!seguimiento) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }
    await seguimiento.update(req.body);
    res.json(seguimiento);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar seguimiento', detalle: error.message });
  }
};

// Eliminar un seguimiento
const eliminar = async (req, res) => {
  try {
    const seguimiento = await SeguimientoPostAdopcion.findByPk(req.params.id);
    if (!seguimiento) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }
    await seguimiento.destroy();
    res.json({ mensaje: 'Seguimiento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar seguimiento', detalle: error.message });
  }
};

module.exports = { listarPorAdopcion, crear, actualizar, eliminar };