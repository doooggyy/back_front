const express = require('express');
const cors = require('cors');

const sequelize = require('./models').sequelize;
const initModels = require('./models/init-models');
const models = initModels(sequelize);

const estadosRouter = require('./routes/estados');
const marcasRouter = require('./routes/marcas');
const rolesRouter = require('./routes/roles');
const tiposRouter = require('./routes/tipos');
const usuariosRouter = require('./routes/usuarios');
const inventariosRouter = require('./routes/inventarios');

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/estados', estadosRouter(models.Estado));
app.use('/api/marcas', marcasRouter(models.Marca));
app.use('/api/roles', rolesRouter(models.Rol));
app.use('/api/tipos', tiposRouter(models.Tipo));
app.use('/api/usuarios', usuariosRouter(models.Usuario));
app.use('/api/inventarios', inventariosRouter(models.Inventario));

const PORT = process.env.PORT || 6173;

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.'});
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});
