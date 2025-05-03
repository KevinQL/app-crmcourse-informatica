const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Proteger todas las rutas con el middleware de autenticación
router.use(authMiddleware);

// Crear un nuevo estudiante
router.post('/', studentController.create);

// Obtener todos los estudiantes
router.get('/', studentController.findAll);

// Obtener un estudiante por ID
router.get('/:id', studentController.findOne);

// Actualizar un estudiante
router.put('/:id', studentController.update);

// Eliminar un estudiante
router.delete('/:id', studentController.delete);

module.exports = router;