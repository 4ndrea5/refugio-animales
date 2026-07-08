const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Registrar un nuevo usuario
const registrar = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, direccion, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese email' });
    }

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      email,
      password: passwordEncriptada,
      telefono,
      direccion,
      rol: 'adoptante', // el registro público siempre crea adoptantes, nunca admin/veterinario
    });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id_usuario: nuevoUsuario.id_usuario,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', detalle: error.message });
  }
};

// Listar todos los usuarios (solo admin)
const listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar usuarios', detalle: error.message });
  }
};

// Crear una cuenta de staff (veterinario o admin) - solo admin puede hacerlo
const crearStaff = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, direccion, rol } = req.body;

    if (!['veterinario', 'admin'].includes(rol)) {
      return res.status(400).json({ error: 'Rol no válido para cuenta de staff' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese email' });
    }

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre, apellido, email, password: passwordEncriptada, telefono, direccion, rol,
    });

    res.status(201).json({
      id_usuario: nuevoUsuario.id_usuario,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cuenta de staff', detalle: error.message });
  }
};

// Cambiar el rol de un usuario existente (solo admin)
const cambiarRol = async (req, res) => {
  try {
    const { rol } = req.body;
    if (!['admin', 'veterinario', 'adoptante'].includes(rol)) {
      return res.status(400).json({ error: 'Rol no válido' });
    }

    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.update({ rol });
    res.json({ mensaje: 'Rol actualizado correctamente', usuario: { id_usuario: usuario.id_usuario, rol: usuario.rol } });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar rol', detalle: error.message });
  }
};

module.exports = { registrar, login, listar, crearStaff, cambiarRol };