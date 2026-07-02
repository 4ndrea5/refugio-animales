const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Notificacion = sequelize.define('Notificacion', {
  id_notificacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM('vacuna_pendiente', 'solicitud_actualizada', 'seguimiento_programado', 'donacion_recibida', 'general'),
    allowNull: false,
    defaultValue: 'general',
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  leida: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  link_relacionado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'notificaciones',
  timestamps: true,
});

// Relación
Usuario.hasMany(Notificacion, { foreignKey: 'id_usuario' });
Notificacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Notificacion;