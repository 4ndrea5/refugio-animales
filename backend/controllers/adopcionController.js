const Adopcion = require('../models/Adopcion');
const Animal = require('../models/Animal');
const Usuario = require('../models/Usuario');

// Listar todas las adopciones (admin)
const listar = async (req, res) => {
  try {
    const adopciones = await Adopcion.findAll({
      include: [
        { model: Usuario, as: 'adoptante', attributes: ['id_usuario', 'nombre', 'apellido', 'email'] },
        { model: Animal, attributes: ['id_animal', 'nombre', 'especie'] },
      ],
      order: [['fecha_adopcion', 'DESC']],
    });
    res.json(adopciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar adopciones', detalle: error.message });
  }
};

// Listar mis propias adopciones (adoptante)
const listarMias = async (req, res) => {
  try {
    const adopciones = await Adopcion.findAll({
      where: { id_usuario: req.usuario.id_usuario },
      include: [{ model: Animal, attributes: ['id_animal', 'nombre', 'especie', 'foto_url'] }],
      order: [['fecha_adopcion', 'DESC']],
    });
    res.json(adopciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar tus adopciones', detalle: error.message });
  }
};

// Obtener una adopción por id (con detalle completo)
const obtenerPorId = async (req, res) => {
  try {
    const adopcion = await Adopcion.findByPk(req.params.id, {
      include: [
        { model: Usuario, as: 'adoptante', attributes: ['id_usuario', 'nombre', 'apellido', 'email', 'telefono'] },
        { model: Animal },
      ],
    });
    if (!adopcion) {
      return res.status(404).json({ error: 'Adopción no encontrada' });
    }
    res.json(adopcion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener adopción', detalle: error.message });
  }
};

module.exports = { listar, listarMias, obtenerPorId };