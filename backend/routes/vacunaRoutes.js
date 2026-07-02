const express = require('express');
const router = express.Router();
const { listarPorAnimal, listarProximas, crear, actualizar, eliminar } = require('../controllers/vacunaController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

router.get('/proximas', verificarToken, listarProximas);
router.get('/animal/:idAnimal', verificarToken, listarPorAnimal);
router.post('/', verificarToken, verificarRol('admin', 'veterinario'), crear);
router.put('/:id', verificarToken, verificarRol('admin', 'veterinario'), actualizar);
router.delete('/:id', verificarToken, verificarRol('admin', 'veterinario'), eliminar);

module.exports = router;