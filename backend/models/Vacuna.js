const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Animal = require('./Animal');
const Usuario = require('./Usuario');

const Vacuna = sequelize.define('Vacuna', {
  id_vacuna: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_vacuna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_aplicacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fecha_proxima_dosis: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  lote: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'vacunas',
  timestamps: true,
});

// Relaciones
Animal.hasMany(Vacuna, { foreignKey: 'id_animal' });
Vacuna.belongsTo(Animal, { foreignKey: 'id_animal' });

Usuario.hasMany(Vacuna, { foreignKey: 'id_veterinario' });
Vacuna.belongsTo(Usuario, { foreignKey: 'id_veterinario', as: 'veterinario' });

module.exports = Vacuna;