const express = require('express');
const router = express.Router();
const { listar, obtenerPorId, crear, actualizar, eliminar } = require('../controllers/animalController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

// Cualquier usuario logueado puede ver los animales
router.get('/', verificarToken, listar);
router.get('/:id', verificarToken, obtenerPorId);

// Solo admin y veterinario pueden crear, editar o eliminar animales
router.post('/', verificarToken, verificarRol('admin', 'veterinario'), crear);
router.put('/:id', verificarToken, verificarRol('admin', 'veterinario'), actualizar);
router.delete('/:id', verificarToken, verificarRol('admin'), eliminar);

module.exports = router;