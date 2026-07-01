const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Animal = require('./models/Animal');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Refugio de Animales funcionando' });
});

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