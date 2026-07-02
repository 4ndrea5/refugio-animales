const express = require('express');
const router = express.Router();
const { listar, listarMias, obtenerPorId } = require('../controllers/adopcionController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

router.get('/', verificarToken, verificarRol('admin'), listar);
router.get('/mias', verificarToken, listarMias);
router.get('/:id', verificarToken, obtenerPorId);

module.exports = router;