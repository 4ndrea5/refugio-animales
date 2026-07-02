const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Animal = require('./Animal');
const SolicitudAdopcion = require('./SolicitudAdopcion');

const Adopcion = sequelize.define('Adopcion', {
  id_adopcion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_adopcion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  contrato_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'adopciones',
  timestamps: true,
});

// Relaciones
SolicitudAdopcion.hasOne(Adopcion, { foreignKey: 'id_solicitud' });
Adopcion.belongsTo(SolicitudAdopcion, { foreignKey: 'id_solicitud' });

Usuario.hasMany(Adopcion, { foreignKey: 'id_usuario' });
Adopcion.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'adoptante' });

Animal.hasMany(Adopcion, { foreignKey: 'id_animal' });
Adopcion.belongsTo(Animal, { foreignKey: 'id_animal' });

module.exports = Adopcion;