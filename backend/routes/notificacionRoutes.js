const express = require('express');
const router = express.Router();
const { listarMias, marcarLeida, crear } = require('../controllers/notificacionController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

router.get('/mias', verificarToken, listarMias);
router.put('/:id/leida', verificarToken, marcarLeida);
router.post('/', verificarToken, verificarRol('admin'), crear);

module.exports = router;