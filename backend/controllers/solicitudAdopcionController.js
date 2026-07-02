const SolicitudAdopcion = require('../models/SolicitudAdopcion');
const Adopcion = require('../models/Adopcion');
const Animal = require('../models/Animal');
const Usuario = require('../models/Usuario');

// Listar todas las solicitudes (admin) - con filtro opcional por estado
const listar = async (req, res) => {
  try {
    const { estado } = req.query;
    const filtro = estado ? { estado } : {};
    const solicitudes = await SolicitudAdopcion.findAll({
      where: filtro,
      include: [
        { model: Usuario, as: 'adoptante', attributes: ['id_usuario', 'nombre', 'apellido', 'email'] },
        { model: Animal, attributes: ['id_animal', 'nombre', 'especie'] },
      ],
      order: [['fecha_solicitud', 'DESC']],
    });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar solicitudes', detalle: error.message });
  }
};

// Listar mis propias solicitudes (adoptante)
const listarMias = async (req, res) => {
  try {
    const solicitudes = await SolicitudAdopcion.findAll({
      where: { id_usuario: req.usuario.id_usuario },
      include: [{ model: Animal, attributes: ['id_animal', 'nombre', 'especie', 'foto_url'] }],
      order: [['fecha_solicitud', 'DESC']],
    });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar tus solicitudes', detalle: error.message });
  }
};

// Crear una nueva solicitud de adopción
const crear = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.body.id_animal);
    if (!animal) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    if (animal.estado !== 'disponible') {
      return res.status(400).json({ error: 'Este animal no está disponible para adopción' });
    }

    const nuevaSolicitud = await SolicitudAdopcion.create({
      id_usuario: req.usuario.id_usuario,
      id_animal: req.body.id_animal,
      motivo: req.body.motivo,
      respuestas_cuestionario: req.body.respuestas_cuestionario,
    });

    // El animal pasa a "en proceso" mientras se evalúa la solicitud
    await animal.update({ estado: 'en_proceso' });

    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear solicitud', detalle: error.message });
  }
};

// Cambiar el estado de una solicitud (aprobar/rechazar) - solo admin
const cambiarEstado = async (req, res) => {
  try {
    const { estado } = req.body; // 'en_revision', 'aprobada', 'rechazada'
    const solicitud = await SolicitudAdopcion.findByPk(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    await solicitud.update({
      estado,
      fecha_respuesta: new Date(),
      id_admin_revisor: req.usuario.id_usuario,
    });

    const animal = await Animal.findByPk(solicitud.id_animal);

    if (estado === 'aprobada') {
      await Adopcion.create({
        id_solicitud: solicitud.id_solicitud,
        id_usuario: solicitud.id_usuario,
        id_animal: solicitud.id_animal,
      });
      await animal.update({ estado: 'adoptado' });
    } else if (estado === 'rechazada') {
      await animal.update({ estado: 'disponible' });
    }

    res.json({ mensaje: 'Estado de solicitud actualizado', solicitud });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar estado', detalle: error.message });
  }
};

module.exports = { listar, listarMias, crear, cambiarEstado };