const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Animal = sequelize.define('Animal', {
  id_animal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especie: {
    type: DataTypes.ENUM('perro', 'gato', 'otro'),
    allowNull: false,
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  edad_estimada: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sexo: {
    type: DataTypes.ENUM('macho', 'hembra'),
    allowNull: false,
  },
  tamano: {
    type: DataTypes.ENUM('pequeno', 'mediano', 'grande'),
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  foto_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM('disponible', 'en_proceso', 'adoptado', 'en_tratamiento', 'no_disponible'),
    allowNull: false,
    defaultValue: 'disponible',
  },
  fecha_ingreso: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'animales',
  timestamps: true,
});

module.exports = Animal;