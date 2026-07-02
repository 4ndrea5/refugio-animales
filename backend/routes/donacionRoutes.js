const express = require('express');
const router = express.Router();
const { listar, listarMias, crear } = require('../controllers/donacionController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

router.get('/', verificarToken, verificarRol('admin'), listar);
router.get('/mias', verificarToken, listarMias);

// Sin verificarToken: permite donaciones anónimas también
router.post('/', crear);

module.exports = router;