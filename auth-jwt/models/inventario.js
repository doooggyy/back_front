const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventario', {
    serial: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    modelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "modelo_UNIQUE"
    },
    descripcion: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    fecha_compra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado',
        key: 'id'
      }
    },
    tipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo',
        key: 'id'
      }
    },
    marca_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'marca',
        key: 'id'
      }
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'inventario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "serial" },
        ]
      },
      {
        name: "modelo_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "modelo" },
        ]
      },
      {
        name: "fk_inventario_estado1_idx",
        using: "BTREE",
        fields: [
          { name: "estado_id" },
        ]
      },
      {
        name: "fk_inventario_tipo1_idx",
        using: "BTREE",
        fields: [
          { name: "tipo_id" },
        ]
      },
      {
        name: "fk_inventario_marca1_idx",
        using: "BTREE",
        fields: [
          { name: "marca_id" },
        ]
      },
    ]
  });
};
