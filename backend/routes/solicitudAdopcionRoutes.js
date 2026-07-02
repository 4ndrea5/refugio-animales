const express = require('express');
const router = express.Router();
const { listar, listarMias, crear, cambiarEstado } = require('../controllers/solicitudAdopcionController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

// Admin ve todas las solicitudes
router.get('/', verificarToken, verificarRol('admin'), listar);

// Cualquier usuario logueado ve sus propias solicitudes
router.get('/mias', verificarToken, listarMias);

// Cualquier usuario logueado puede solicitar adoptar
router.post('/', verificarToken, crear);

// Solo admin puede aprobar/rechazar
router.put('/:id/estado', verificarToken, verificarRol('admin'), cambiarEstado);

module.exports = router;