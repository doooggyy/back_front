var DataTypes = require("sequelize").DataTypes;
var _estado = require("./estado");
var _inventario = require("./inventario");
var _marca = require("./marca");
var _rol = require("./rol");
var _tipo = require("./tipo");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var Estado = _estado(sequelize, DataTypes);
  var Inventario = _inventario(sequelize, DataTypes);
  var Marca = _marca(sequelize, DataTypes);
  var Rol = _rol(sequelize, DataTypes);
  var Tipo = _tipo(sequelize, DataTypes);
  var Usuario = _usuario(sequelize, DataTypes);

  Inventario.belongsTo(Estado, { as: "estado", foreignKey: "estado_id"});
  Estado.hasMany(Inventario, { as: "inventarios", foreignKey: "estado_id"});
  Inventario.belongsTo(Marca, { as: "marca", foreignKey: "marca_id"});
  Marca.hasMany(Inventario, { as: "inventarios", foreignKey: "marca_id"});
  Usuario.belongsTo(Rol, { as: "rol", foreignKey: "rol_id"});
  Rol.hasMany(Usuario, { as: "usuarios", foreignKey: "rol_id"});
  Inventario.belongsTo(Tipo, { as: "tipo", foreignKey: "tipo_id"});
  Tipo.hasMany(Inventario, { as: "inventarios", foreignKey: "tipo_id"});

  return {
    Estado,
    Inventario,
    Marca,
    Rol,
    Tipo,
    Usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
