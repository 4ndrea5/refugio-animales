const HistorialMedico = require('../models/HistorialMedico');
const Animal = require('../models/Animal');
const Usuario = require('../models/Usuario');

// Listar historial médico de un animal específico
const listarPorAnimal = async (req, res) => {
  try {
    const registros = await HistorialMedico.findAll({
      where: { id_animal: req.params.idAnimal },
      include: [{ model: Usuario, as: 'veterinario', attributes: ['id_usuario', 'nombre', 'apellido'] }],
      order: [['fecha', 'DESC']],
    });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar historial médico', detalle: error.message });
  }
};

// Crear un nuevo registro de historial médico
const crear = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.body.id_animal);
    if (!animal) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }

    const nuevoRegistro = await HistorialMedico.create({
      ...req.body,
      id_veterinario: req.usuario.id_usuario,
    });
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear registro médico', detalle: error.message });
  }
};

// Actualizar un registro
const actualizar = async (req, res) => {
  try {
    const registro = await HistorialMedico.findByPk(req.params.id);
    if (!registro) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    await registro.update(req.body);
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar registro', detalle: error.message });
  }
};

// Eliminar un registro
const eliminar = async (req, res) => {
  try {
    const registro = await HistorialMedico.findByPk(req.params.id);
    if (!registro) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    await registro.destroy();
    res.json({ mensaje: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar registro', detalle: error.message });
  }
};

module.exports = { listarPorAnimal, crear, actualizar, eliminar };