const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Animal = require('./Animal');
const Usuario = require('./Usuario');

const SolicitudAdopcion = sequelize.define('SolicitudAdopcion', {
  id_solicitud: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_solicitud: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en_revision', 'aprobada', 'rechazada'),
    allowNull: false,
    defaultValue: 'pendiente',
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  respuestas_cuestionario: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha_respuesta: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'solicitudes_adopcion',
  timestamps: true,
});

// Relaciones
Usuario.hasMany(SolicitudAdopcion, { foreignKey: 'id_usuario' });
SolicitudAdopcion.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'adoptante' });

Animal.hasMany(SolicitudAdopcion, { foreignKey: 'id_animal' });
SolicitudAdopcion.belongsTo(Animal, { foreignKey: 'id_animal' });

Usuario.hasMany(SolicitudAdopcion, { foreignKey: 'id_admin_revisor' });
SolicitudAdopcion.belongsTo(Usuario, { foreignKey: 'id_admin_revisor', as: 'admin_revisor' });

module.exports = SolicitudAdopcion;