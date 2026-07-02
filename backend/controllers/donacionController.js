const Donacion = require('../models/Donacion');
const Usuario = require('../models/Usuario');

// Listar todas las donaciones (admin)
const listar = async (req, res) => {
  try {
    const donaciones = await Donacion.findAll({
      include: [{ model: Usuario, attributes: ['id_usuario', 'nombre', 'apellido'] }],
      order: [['fecha_donacion', 'DESC']],
    });
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar donaciones', detalle: error.message });
  }
};

// Listar mis propias donaciones
const listarMias = async (req, res) => {
  try {
    const donaciones = await Donacion.findAll({
      where: { id_usuario: req.usuario.id_usuario },
      order: [['fecha_donacion', 'DESC']],
    });
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar tus donaciones', detalle: error.message });
  }
};

// Registrar una donación (puede ser anónima si no hay usuario logueado)
const crear = async (req, res) => {
  try {
    const nuevaDonacion = await Donacion.create({
      ...req.body,
      id_usuario: req.usuario ? req.usuario.id_usuario : null,
    });
    res.status(201).json(nuevaDonacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar donación', detalle: error.message });
  }
};

module.exports = { listar, listarMias, crear };