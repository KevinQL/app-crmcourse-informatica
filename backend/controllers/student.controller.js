const db = require('../models');
const Student = db.Student;

// Crear un nuevo estudiante
exports.create = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({
      message: error.message || "Error al crear el estudiante"
    });
  }
};

// Obtener todos los estudiantes
exports.findAll = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener los estudiantes"
    });
  }
};

// Obtener un estudiante por ID
exports.findOne = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener el estudiante"
    });
  }
};

// Actualizar un estudiante
exports.update = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    await student.update(req.body);
    res.json({ message: "Estudiante actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Error al actualizar el estudiante"
    });
  }
};

// Eliminar un estudiante
exports.delete = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    await student.destroy();
    res.json({ message: "Estudiante eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al eliminar el estudiante"
    });
  }
};