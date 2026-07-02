const express = require('express');
const router = express.Router();
const { listarPorAdopcion, crear, actualizar, eliminar } = require('../controllers/seguimientoController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

router.get('/adopcion/:idAdopcion', verificarToken, listarPorAdopcion);
router.post('/', verificarToken, verificarRol('admin', 'veterinario'), crear);
router.put('/:id', verificarToken, verificarRol('admin', 'veterinario'), actualizar);
router.delete('/:id', verificarToken, verificarRol('admin'), eliminar);

module.exports = router;