const db = require('../models');
const Admin = db.Admin;

async function createDefaultAdmin() {
  try {
    const adminExists = await Admin.findOne({ where: { username: 'admin' } });
    
    if (!adminExists) {
      const admin = await Admin.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // La contraseña será hasheada automáticamente por el hook beforeCreate
        firstName: 'Administrador',
        lastName: 'Principal',
        phone: '123456789'
      });
      
      console.log('Administrador por defecto creado exitosamente:', admin.username);
    } else {
      console.log('El administrador por defecto ya existe');
    }
  } catch (error) {
    console.error('Error al crear el administrador por defecto:', error);
  }
}

module.exports = createDefaultAdmin;