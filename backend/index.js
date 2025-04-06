require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const createDefaultAdmin = require('./seeders/adminSeeder');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);

// Sincronizar base de datos y crear admin por defecto
db.sequelize.sync().then(async () => {
  console.log('Base de datos sincronizada');
  // Crear administrador por defecto
  await createDefaultAdmin();
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});