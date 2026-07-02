const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Donacion = sequelize.define('Donacion', {
  id_donacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  tipo: {
    type: DataTypes.ENUM('monetaria', 'especie'),
    allowNull: false,
    defaultValue: 'monetaria',
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha_donacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  comprobante_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'donaciones',
  timestamps: true,
});

// Relación
Usuario.hasMany(Donacion, { foreignKey: 'id_usuario' });
Donacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Donacion;