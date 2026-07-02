const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Animal = require('./models/Animal');
const HistorialMedico = require('./models/HistorialMedico');
const Vacuna = require('./models/Vacuna');
const SolicitudAdopcion = require('./models/SolicitudAdopcion');
const Adopcion = require('./models/Adopcion');
const SeguimientoPostAdopcion = require('./models/SeguimientoPostAdopcion');
const Donacion = require('./models/Donacion');
const Notificacion = require('./models/Notificacion');
const usuarioRoutes = require('./routes/usuarioRoutes');
const animalRoutes = require('./routes/animalRoutes');
const historialMedicoRoutes = require('./routes/historialMedicoRoutes');
const vacunaRoutes = require('./routes/vacunaRoutes');
const solicitudAdopcionRoutes = require('./routes/solicitudAdopcionRoutes');
const adopcionRoutes = require('./routes/adopcionRoutes');
const seguimientoRoutes = require('./routes/seguimientoRoutes');
const donacionRoutes = require('./routes/donacionRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Refugio de Animales funcionando' });
});
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/animales', animalRoutes);
app.use('/api/historial', historialMedicoRoutes);
app.use('/api/vacunas', vacunaRoutes);
app.use('/api/solicitudes', solicitudAdopcionRoutes);
app.use('/api/adopciones', adopcionRoutes);
app.use('/api/seguimientos', seguimientoRoutes);
app.use('/api/donaciones', donacionRoutes);
const PORT = process.env.PORT || 4000;

sequelize.sync()
  .then(() => {
    console.log('Conexión a la base de datos exitosa y tablas sincronizadas');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });