const jwt = require('jsonwebtoken');
const db = require('../models');
const Admin = db.Admin;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await admin.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });
    if (!admin) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const admin = await Admin.findByPk(req.userId);
    
    if (!admin) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (password) updates.password = password;

    await admin.update(updates);
    
    const updatedAdmin = await Admin.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      message: "Perfil actualizado exitosamente",
      admin: updatedAdmin
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};