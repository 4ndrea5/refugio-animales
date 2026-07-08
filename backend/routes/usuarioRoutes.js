const express = require('express');
const router = express.Router();
const { registrar, login, listar, crearStaff, cambiarRol } = require('../controllers/usuarioController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

router.post('/registrar', registrar);
router.post('/login', login);

router.get('/', verificarToken, verificarRol('admin'), listar);
router.post('/staff', verificarToken, verificarRol('admin'), crearStaff);
router.put('/:id/rol', verificarToken, verificarRol('admin'), cambiarRol);

module.exports = router;