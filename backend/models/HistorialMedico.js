const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Animal = require('./Animal');
const Usuario = require('./Usuario');

const HistorialMedico = sequelize.define('HistorialMedico', {
  id_historial: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'historial_medico',
  timestamps: true,
});

// Relaciones
Animal.hasMany(HistorialMedico, { foreignKey: 'id_animal' });
HistorialMedico.belongsTo(Animal, { foreignKey: 'id_animal' });

Usuario.hasMany(HistorialMedico, { foreignKey: 'id_veterinario' });
HistorialMedico.belongsTo(Usuario, { foreignKey: 'id_veterinario', as: 'veterinario' });

module.exports = HistorialMedico;