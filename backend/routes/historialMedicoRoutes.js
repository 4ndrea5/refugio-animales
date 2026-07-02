const express = require('express');
const router = express.Router();
const { listarPorAnimal, crear, actualizar, eliminar } = require('../controllers/historialMedicoController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

router.get('/animal/:idAnimal', verificarToken, listarPorAnimal);
router.post('/', verificarToken, verificarRol('admin', 'veterinario'), crear);
router.put('/:id', verificarToken, verificarRol('admin', 'veterinario'), actualizar);
router.delete('/:id', verificarToken, verificarRol('admin', 'veterinario'), eliminar);

module.exports = router;