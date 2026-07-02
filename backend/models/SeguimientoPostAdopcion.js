const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Adopcion = require('./Adopcion');
const Usuario = require('./Usuario');

const SeguimientoPostAdopcion = sequelize.define('SeguimientoPostAdopcion', {
  id_seguimiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_seguimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado_animal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  proxima_visita: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'seguimientos_post_adopcion',
  timestamps: true,
});

// Relaciones
Adopcion.hasMany(SeguimientoPostAdopcion, { foreignKey: 'id_adopcion' });
SeguimientoPostAdopcion.belongsTo(Adopcion, { foreignKey: 'id_adopcion' });

Usuario.hasMany(SeguimientoPostAdopcion, { foreignKey: 'id_responsable' });
SeguimientoPostAdopcion.belongsTo(Usuario, { foreignKey: 'id_responsable', as: 'responsable' });

module.exports = SeguimientoPostAdopcion;