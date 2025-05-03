const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Student = sequelize.define('Student', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Student;
};