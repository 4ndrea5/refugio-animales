const Vacuna = require('../models/Vacuna');
const Animal = require('../models/Animal');
const Usuario = require('../models/Usuario');

// Listar vacunas de un animal específico
const listarPorAnimal = async (req, res) => {
  try {
    const registros = await Vacuna.findAll({
      where: { id_animal: req.params.idAnimal },
      include: [{ model: Usuario, as: 'veterinario', attributes: ['id_usuario', 'nombre', 'apellido'] }],
      order: [['fecha_aplicacion', 'DESC']],
    });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar vacunas', detalle: error.message });
  }
};

// Listar vacunas próximas a vencer (para notificaciones/dashboard)
const listarProximas = async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const hoy = new Date();
    const en30dias = new Date();
    en30dias.setDate(hoy.getDate() + 30);

    const proximas = await Vacuna.findAll({
      where: {
        fecha_proxima_dosis: { [Op.between]: [hoy, en30dias] },
      },
      include: [{ model: Animal, attributes: ['id_animal', 'nombre'] }],
      order: [['fecha_proxima_dosis', 'ASC']],
    });
    res.json(proximas);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar vacunas próximas', detalle: error.message });
  }
};

// Crear un nuevo registro de vacuna
const crear = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.body.id_animal);
    if (!animal) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }

    const nuevaVacuna = await Vacuna.create({
      ...req.body,
      id_veterinario: req.usuario.id_usuario,
    });
    res.status(201).json(nuevaVacuna);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear vacuna', detalle: error.message });
  }
};

// Actualizar una vacuna
const actualizar = async (req, res) => {
  try {
    const vacuna = await Vacuna.findByPk(req.params.id);
    if (!vacuna) {
      return res.status(404).json({ error: 'Vacuna no encontrada' });
    }
    await vacuna.update(req.body);
    res.json(vacuna);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar vacuna', detalle: error.message });
  }
};

// Eliminar una vacuna
const eliminar = async (req, res) => {
  try {
    const vacuna = await Vacuna.findByPk(req.params.id);
    if (!vacuna) {
      return res.status(404).json({ error: 'Vacuna no encontrada' });
    }
    await vacuna.destroy();
    res.json({ mensaje: 'Vacuna eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar vacuna', detalle: error.message });
  }
};

module.exports = { listarPorAnimal, listarProximas, crear, actualizar, eliminar };