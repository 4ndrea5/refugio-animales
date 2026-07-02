const Animal = require('../models/Animal');

// Listar todos los animales (con filtro opcional por estado)
const listar = async (req, res) => {
  try {
    const { estado } = req.query;
    const filtro = estado ? { where: { estado } } : {};
    const animales = await Animal.findAll(filtro);
    res.json(animales);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar animales', detalle: error.message });
  }
};

// Obtener un animal por id
const obtenerPorId = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener animal', detalle: error.message });
  }
};

// Crear un nuevo animal
const crear = async (req, res) => {
  try {
    const nuevoAnimal = await Animal.create(req.body);
    res.status(201).json(nuevoAnimal);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear animal', detalle: error.message });
  }
};

// Actualizar un animal existente
const actualizar = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    await animal.update(req.body);
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar animal', detalle: error.message });
  }
};

// Eliminar un animal
const eliminar = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    await animal.destroy();
    res.json({ mensaje: 'Animal eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar animal', detalle: error.message });
  }
};

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };